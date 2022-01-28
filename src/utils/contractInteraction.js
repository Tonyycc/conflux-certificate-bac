const abi = require("../data/abi.json");
const { Conflux } = require("js-conflux-sdk");

const CONTRACT_ADDRESS = "cfx:aca82m8muzbbjbkp4jemhj7evyyhw5r9vps92vs186";
const RPC_ENDPOINT = "https://main.confluxrpc.com";

export const getTotalSupply = async () => {
  const cfx = await Conflux.create({
    url: RPC_ENDPOINT,
    logger: console,
  });

  const contract = cfx.Contract({
    address: CONTRACT_ADDRESS,
    abi,
  });

  try {
    let response = await contract.totalSupply();
    return response[0];
  } catch (error) {
    console.error(error);
    return;
  }
};

export const queryAllNfts = async (totalSupply) => {
  const cfx = await Conflux.create({
    url: RPC_ENDPOINT,
    logger: console,
  });

  const contract = cfx.Contract({
    address: CONTRACT_ADDRESS,
    abi,
  });

  const nftsMetadatas = [];
  try {
    for (let i = 0; i < totalSupply; i++) {
      let response = await contract.tokenURI(i);
      const metadata = await fetch(response);
      nftsMetadatas.push(await metadata.json());
    }
    return nftsMetadatas;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const mintNFT = async (owner, tokenId, tokenUri) => {
  const conflux = window["conflux"];

  let cfx = new Conflux({ networkId: 1 });
  cfx.provider = conflux;

  const contract = cfx.Contract({
    address: CONTRACT_ADDRESS,
    abi,
  });

  try {
    let response = await contract
      .mint(owner, tokenId, tokenUri)
      .sendTransaction({ from: conflux.selectedAddress })
      .executed();
    // set a callback instead
    alert(
      `https://testnet.confluxscan.io/transaction/${response.transactionHash}`
    );

    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};
