export default (dateStr) => {
  const date = new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    // day: "numeric",
  });
  return date;
}