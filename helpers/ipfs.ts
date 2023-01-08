import { NFTData } from "../types/NFTData";
import axios from "axios";

const pinataURL = process.env.NEXT_PUBLIC_PINATA_URL;
const jwt = process.env.NEXT_PUBLIC_PINATA_JWT;

export const uploadNFTData = async (nftData: NFTData) => {
  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: nftData,
  });

  const config = {
    method: "post",
    url: pinataURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    data: data,
  };

  const response = await axios(config);
  if (response.status !== 200)
    throw Error(
      "Could not resolve IPFS from NFT Storage Gateway. Response: " +
        response.status
    );
  return response.data;
};

export const resolveIpfs = async (ipfs: string) => {
  const nftStorageUrl = ipfs.replace(
    /^ipfs:\/\/?/,
    "https://nftstorage.link/ipfs/"
  );
  try {
    const response = await axios.get(nftStorageUrl);
    return response.data;
  } catch (error) {
    throw Error(
      `Could not resolve IPFS from NFT Storage Gateway. Error: ${
        (error as Error).message
      }`
    );
  }
};
