export function orderStatus(key) {
  if (key === "waiting_shipping") {
    return "Waiting to be shipped";
  } else if (key === "completed") {
    return "Customer Received";
  } else if (key === "refunded") {
    return "Customer Returned";
  } else if (key === "failed") {
    return "Failed Order";
  } else if (key === "cancelled") {
    return "Cancelled";
  }
  return "Unknown";
}
