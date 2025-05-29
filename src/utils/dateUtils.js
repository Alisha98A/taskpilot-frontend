export function formatDateForInput(dateString) {
  if (!dateString) return ""; // if null/undefined, return empty string
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // invalid date returns empty string

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const getMinDate = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};