import { isNil, isEmpty } from "lodash";
import northAmericanZipCodes from "zipcodes-nrviens";

const productTypes = {
  LAKEMAT: "lakemat",
  MUCKMAT: "muckmat",
  BOATMAT: "boatmat",
  SANDMAT: "sandmat",
  MUCK_SANDMAT: "muck_sandmat",
  DOCKMAT: "dockmat",
};

const boatmatSizes = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg",
  EXTRA_LARGE: "xl",
  DOCK: "dock",
};

const shippingZones = {
  ZONE_1: "zone_1",
  ZONE_2: "zone_2",
  ZONE_3: "zone_3",
  ZONE_4: "zone_4",
  ZONE_5: "zone_5",
};

const countryShippingZone = {
  AT: shippingZones.ZONE_3,
  BE: shippingZones.ZONE_1,
  BG: shippingZones.ZONE_4,
  CZ: shippingZones.ZONE_4,
  DK: shippingZones.ZONE_3,
  EE: shippingZones.ZONE_4,
  FI: shippingZones.ZONE_3,
  FR: shippingZones.ZONE_1,
  DE: shippingZones.ZONE_2,
  GR: shippingZones.ZONE_3,
  IE: shippingZones.ZONE_3,
  IT: shippingZones.ZONE_1,
  LV: shippingZones.ZONE_4,
  LT: shippingZones.ZONE_4,
  LU: shippingZones.ZONE_2,
  NL: shippingZones.ZONE_2,
  NO: shippingZones.ZONE_5,
  PL: shippingZones.ZONE_4,
  PT: shippingZones.ZONE_1,
  RO: shippingZones.ZONE_4,
  SK: shippingZones.ZONE_4,
  SI: shippingZones.ZONE_4,
  ES: shippingZones.ZONE_1,
  SE: shippingZones.ZONE_3,
  CH: shippingZones.ZONE_5,
  GB: shippingZones.ZONE_2,
};

export function formatPrice(amountInCents, currency) {
  let locale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  if (currency === "EUR") {
    locale = Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    });
  } else if (currency === "GBP") {
    locale = Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "GBP",
    });
  } else if (currency === "DKK") {
    locale = Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "DKK",
    });
  } else if (currency === "NOK") {
    locale = Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "NOK",
    });
  } else if (currency === "SEK") {
    locale = Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "SEK",
    });
  } else if (currency === "CHF") {
    locale = Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "CHF",
    });
  } else if (currency === "PLN") {
    locale = Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "PLN",
    });
  }

  return locale.format(parseInt(amountInCents) * 0.01);
}

// export function formatPrice(priceInPennys) {
//   const currencyFormat = process.env.NEXT_PUBLIC_CURRENCY_FORMAT;
//   const currency = process.env.NEXT_PUBLIC_CURRENCY;
//   return new Intl.NumberFormat(currencyFormat, {
//     style: "currency",
//     currency: currency,
//   }).format(priceInPennys * 0.01);
// }

export function totalPriceInCart({ cart }) {
  return Object.values(cart)
    .map(({ product, quantity }) => {
      return parseInt(quantity) * parseInt(product["price"]);
    })
    .reduce((a, b) => a + b, 0);
}
export function quantityOfProducts({ cart }) {
  return Object.values(cart)
    .map((quantity) => parseInt(quantity))
    .reduce((a, b) => a + b, 0);
}

export function priceBreakDown({
  cart,
  discountCode,
  shippingAddress,
  shippingCost,
  vatNumber,
}) {
  let prevSubtotal = totalPriceInCart({ cart });
  const shippingTotal = calculateShippingCost({
    cart,
    shippingCountry: shippingAddress.country,
    shippingCost,
  });
  let { subtotal, discount } = calculateDiscount({
    productCount: quantityOfProducts({ cart }),
    subtotal: prevSubtotal,
    discountCode,
  });
  const salesTax = calculateSalesTax({
    subtotal: subtotal + shippingTotal,
    address: shippingAddress,
    vatNumber,
  });

  const total = subtotal + salesTax + shippingTotal;

  return {
    subtotal: prevSubtotal,
    shippingTotal,
    discount,
    salesTax,
    total,
  };
}

export function calculateDiscount({ productCount, discountCode, subtotal }) {
  if (isNil(discountCode) || isEmpty(discountCode)) {
    return {
      discount: null,
      subtotal: subtotal,
    };
  }
  if (discountCode["discountType"] === "amount") {
    return {
      discount: discountCode["discountAmount"],
      subtotal: subtotal - discountCode["discountAmount"],
    };
  }
  if (discountCode["discountType"] === "per_product") {
    const discount = discountCode["discountAmount"] * productCount;
    return {
      discount: discount,
      subtotal: subtotal - discount,
    };
  }
  const percentage = 0.01 * discountCode["discountPercentage"];
  const discountAmount = subtotal * percentage;
  const total = subtotal - discountAmount;
  return {
    discount: discountAmount,
    subtotal: total,
  };
}
export function calculateShippingCost({ cart, shippingCountry, shippingCost }) {
  if (getValueByKey(shippingCountry) === "CA") {
    return Object.values(cart)
      .map(({ product, quantity }) => {
        const costOfShipping = shippingPrices({
          productType: product.type,
          productSize: product.size,
        });

        return costOfShipping * quantity;
      })
      .reduce((a, b) => a + b, 0);
  }
  // const shippingZone = countryShippingZone[getValueByKey(shippingCountry)];
  // if (!isNil(shippingZone)) {
  //   return shippingZonePrice(shippingZone);
  // }

  return shippingCost;
}

export function calculateSalesTax({ subtotal, address, vatNumber }) {
  if (getValueByKey(address["country"]) === "US" || isNil(address["country"])) {
    const postalCode = getValueByKey(address["postalCode"]);
    const result = northAmericanZipCodes.lookup(postalCode) || {};
    if (result["state"] === "MI") {
      return subtotal * 0.06; // 6% sales tax
    }
    return 0;
  }
  if (getValueByKey(address["country"]) === "CA") {
    return 0;
  }
  if (!isEmpty(vatNumber)) {
    return 0;
  }
  if (getValueByKey(address["country"]) === "GB") {
    return subtotal * 0.2;
  }
  return subtotal * 0.21;
}

const shippingPrices = ({ productType, productSize }) => {
  if (productType === productTypes.LAKEMAT) {
    return 10000;
  } else if (productType === productTypes.MUCKMAT) {
    return 11500;
  } else if (productType === productTypes.MUCK_SANDMAT) {
    const size = parseInt(productSize);
    if (size <= 40) {
      return 11500;
    }
    return 14500;
  } else if (productType === productTypes.SANDMAT) {
    const size = parseInt(productSize);
    if (size <= 30) {
      return 7000;
    } else if (size <= 40) {
      return 7500;
    } else if (size <= 60) {
      return 8500;
    }
    return 11500;
  } else if (productType === productTypes.BOATMAT) {
    if (
      productSize === boatmatSizes.SMALL ||
      productSize === boatmatSizes.DOCK
    ) {
      return 10000;
    }
    return 13000;
  } else if (productType === productTypes.DOCKMAT) {
    return 10000;
  }
  return 0;
};

const shippingZonePrice = (region) => {
  if (region === shippingZones.ZONE_1) {
    return 3000;
  } else if (region === shippingZones.ZONE_2) {
    return 4000;
  } else if (region === shippingZones.ZONE_3) {
    return 5000;
  } else if (region === shippingZones.ZONE_4) {
    return 6000;
  } else if (region === shippingZones.ZONE_5) {
    return 7000;
  }
  return 0;
};

const getValueByKey = (obj) => {
  if (typeof obj === "object") {
    return obj["value"];
  }
  return obj;
};
