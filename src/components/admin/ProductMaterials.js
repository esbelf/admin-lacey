import React, { useState, useEffect } from "react";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import useAuth from "../../contexts/auth";
import useNotification from "../../contexts/notification";
import { fetchCall, saveCall } from "../../lib/api";
import { useApiFetch } from "../../hooks/api";
import { isNil } from "lodash";
import { DeleteButton, ShowEditAttribute } from "../../components/admin";

export default function ProductMaterials({ productId }) {
  const { authToken } = useAuth();
  const { setErrorMessage, setSuccessMessage } = useNotification();
  const { data } = useApiFetch({ url: "/materials" });
  const materials = data.materials || [];
  const materialOptions = materials.map((material) => ({
    label: material.name,
    value: material,
  }));

  useEffect(() => {
    fetchMaterial();
  }, []);

  const [materialsInProducts, setMaterialsInProducts] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleMaterialSelect = (event, newValue) => {
    setSelectedMaterial(newValue["value"]);
  };
  const addMaterial = async () => {
    if (!isNil(selectedMaterial)) {
      setSaving(true);
      const res = await saveCall({
        endpoint: "/material_in_products",
        authToken,
        data: {
          productId: productId,
          materialId: selectedMaterial.id,
        },
      });
      if (res.status !== 201) {
        setErrorMessage(res.data["message"]);
      } else {
        // add to setMaterialsInProducts() materialsInProducts
        setSuccessMessage("Successfully added material to product");
        await fetchMaterial();
      }
      setSaving(false);
    }
  };
  const fetchMaterial = async () => {
    const res = await fetchCall({
      endpoint: `/material_in_products?product_id=${productId}`,
      authToken,
    });
    setMaterialsInProducts(res.data["materialInProducts"]);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row gap-x-2">
        <Autocomplete
          fullWidth
          id="material-search"
          freeSolo
          options={materialOptions}
          renderInput={(params) => (
            <TextField {...params} label="Find Material" />
          )}
          onChange={handleMaterialSelect}
        />
        <Button variant="contained" onClick={addMaterial} disabled={saving}>
          Add
        </Button>
      </div>
      <div className="w-full flex flex-col gap-x-2 mt-6">
        {materialsInProducts.map((row) => (
          <div className="flex flex-row w-full gap-x-6" key={row.id}>
            <ShowEditAttribute
              title={`${row.materialName} Quantity`}
              attributeName={"quantity"}
              savedValue={row.quantity || 0}
              endpoint={`/material_in_products/${row.id}`}
              textFieldType="number"
            />
            <DeleteButton
              endpoint={`/material_in_products/${row.id}`}
              onSuccess={fetchMaterial}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
