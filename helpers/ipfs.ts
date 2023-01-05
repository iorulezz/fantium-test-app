import { NFTData } from "../types/NFTData";
import axios from "axios";

const pinataURL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4OGE5MmQ3MS1kNzRkLTQwZTAtYmJmZS00NGU0ZDMzNWU3YzIiLCJlbWFpbCI6ImlvcnVsZXp6QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkNDRiY2IwYmEwODdlZGIxNDZlNiIsInNjb3BlZEtleVNlY3JldCI6IjlhMjk5MTk4YWY3MmUyNTRkZTI5OTAwZWFlN2EwMDUxMTc1YzIyOWJiOTEzODJhMWI5NmU1NjMxZjBkY2M4MTciLCJpYXQiOjE2NzI4NDI5NjB9.HsO0PmH89dV3n7_JJqin5aEsOAggnGNMWCP1QIGbbFs";

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
