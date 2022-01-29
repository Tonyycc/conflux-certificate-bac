const abi = require("../data/abi.json");
const { Conflux } = require("js-conflux-sdk");

export const ADMIN_ADDRESS = process.env.REACT_APP_ADMIN_ADDRESS;
export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT;
export const RPC_ENDPOINT = process.env.REACT_APP_CONFLUX_RPC;

export const getTokenOwner = async (tokenId) => {
  const cfx = await Conflux.create({
    url: RPC_ENDPOINT,
    logger: console,
  });

  const contract = cfx.Contract({
    address: CONTRACT_ADDRESS,
    abi,
  });

  try {
    let response = await contract.ownerOf(tokenId);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}

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

export const queryNft = async (tokenId) => {
  const cfx = await Conflux.create({
    url: RPC_ENDPOINT,
    logger: console,
  });

  const contract = cfx.Contract({
    address: CONTRACT_ADDRESS,
    abi,
  });

  try {
    let response = await contract.tokenURI(tokenId);
    const metadata = await fetch(response);
    return metadata.json();
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
      .executed()
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};
