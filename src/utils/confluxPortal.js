const conflux = window["conflux"];

export const requireConfluxProvider = () => {
  if (!(typeof conflux !== "undefined"))
    alert("You need to install Conflux Portal");
};

export const confluxPortalConnect = async () => {
  let requestedAccounts = await conflux.request({
    method: "cfx_requestAccounts",
  });
  let account = requestedAccounts[0];
  return account;
};
