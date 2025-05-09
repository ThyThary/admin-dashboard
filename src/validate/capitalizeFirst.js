//To convert first capitalize into uppercase
const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
export default capitalizeFirst;
