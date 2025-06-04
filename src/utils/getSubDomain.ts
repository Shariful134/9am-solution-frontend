export const getSubdomain = () => {
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length >= 2) {
    console.log(parts[0]);
    return parts[0];
  }
  return null;
};
