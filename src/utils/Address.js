export const formatAddress = (cfxAddress) => {
  return (
    String(cfxAddress).substring(0, 10) +
    "..." +
    String(cfxAddress).substring(38)
  );
};
