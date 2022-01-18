const abi = require("../data/abi.json");
const { Conflux } = require("js-conflux-sdk");


export const getTotalSupply = async () => {
    const cfx = await Conflux.create({ url: "https://test.confluxrpc.com", logger: console });

    const contract = cfx.Contract({ address: "cfxtest:acgp21raz2xzgyvncgx38msceerkmkgp7puzsppukz", abi });

    try {
        let response = await contract.totalSupply();
        return response[0];
    } catch (error) {
        console.error(error);
        return;
    }
}

export const queryAllNfts = async (totalSupply) => {
    const cfx = await Conflux.create({ url: "https://test.confluxrpc.com", logger: console });

    const contract = cfx.Contract({ address: "cfxtest:acgp21raz2xzgyvncgx38msceerkmkgp7puzsppukz", abi });

    const nftsMetadatas = [];
    try {
        for (let i = 0 ; i < totalSupply; i++) {
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

export const mintNFT = async (owner,tokenId,tokenUri) => {
    const conflux = window["conflux"];

    let cfx = new Conflux({ networkId: 1 });
    cfx.provider = conflux;

    const contract = cfx.Contract({ address: "cfxtest:acgp21raz2xzgyvncgx38msceerkmkgp7puzsppukz", abi });

    try {
        let response = await contract.mint(owner,tokenId,tokenUri)
            .sendTransaction({ from: conflux.selectedAddress}).executed();
        console.log(
            `https://testnet.confluxscan.io/transaction/${response.transactionHash}`
        )
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};
