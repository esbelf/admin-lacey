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
  }
  return locale.format(parseInt(amountInCents) * 0.01);
}
