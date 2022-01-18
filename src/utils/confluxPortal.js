const conflux = window["conflux"];

export const confluxPortalConnect = async () => {
    const accounts = await conflux.send("cfx_requestAccounts")
    const account = accounts[0];
    return account;
}