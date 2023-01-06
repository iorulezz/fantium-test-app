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
  return response.data;
  
};
