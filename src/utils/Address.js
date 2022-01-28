export const formatAddress = (cfxAddress) => {
  let strAddress = String(cfxAddress);
  return `${strAddress.substring(0, 10)}...${strAddress.substring(38)}`;
};
