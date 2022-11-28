import { useState, useEffect } from "react";
import axios from "axios";
import { camelizeKeys } from "humps";
import useErrorStatus from "../contexts/errorHandler";
import useAuth from "../contexts/auth";
import { isNil, isEmpty } from "lodash";

export function useApiFetch({ url }) {
  const { authToken, initialLoad } = useAuth();
  const { setErrorStatusCode } = useErrorStatus();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!initialLoad) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}${url}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          setData(camelizeKeys(data));
        })
        .catch((error) => {
          if (error["response"] && error["response"]["status"]) {
            const statusCode = error["response"]["status"];
            setErrorStatusCode(statusCode);
          } else {
            setErrorStatusCode(500);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [url, initialLoad, authToken]);

  return { data, loading };
}

export function usePaginationApiFetch({ url, page, key, searchQuery }) {
  const { authToken, initialLoad } = useAuth();
  const { setErrorStatusCode } = useErrorStatus();
  const [data, setData] = useState({});
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!initialLoad) {
      const searchUrl = new URL(`${process.env.REACT_APP_API_HOST}${url}`);
      if (!isNil(page)) {
        searchUrl.searchParams.append("page", page);
      }
      searchUrl.searchParams.append("search", searchQuery);

      axios
        .get(searchUrl.href, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          console.log("API PAGINATION DATA", data[key], data["meta"]);
          const newData = camelizeKeys(data[key]);
          setData(newData);
          if (isNil(data["meta"])) {
            setMeta({});
          } else {
            setMeta(data["meta"]);
          }
        })
        .catch((error) => {
          if (error["response"] && error["response"]["status"]) {
            const statusCode = error["response"]["status"];
            setErrorStatusCode(statusCode);
          } else {
            setErrorStatusCode(500);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [url, page, key, initialLoad, authToken, searchQuery]);

  return { data: Object.values(data), meta, loading };
}
