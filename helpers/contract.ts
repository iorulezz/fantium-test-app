import { ethers } from "ethers";
import { ABI } from "./abi";
import { ExternalProvider } from "@ethersproject/providers";
import { throwError } from "./contractErrorHandling";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const expectedChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!);

const getProviderFromWindow = () => {
  return new ethers.providers.Web3Provider(
    window.ethereum as unknown as ExternalProvider
  );
};

const getSigner = () => {
  const provider = getProviderFromWindow();
  return provider.getSigner();
};

export const checkConnectedChainId = async () => {
  const provider = getProviderFromWindow();
  const network = await provider.getNetwork();
  return network.chainId === expectedChainId;
};

const callMethod = async (method: string, ...args: any[]) => {
  console.debug("Calling method: ", method, ", with args: ", args);
  try {
    const contract = new ethers.Contract(contractAddress, ABI, getSigner());
    const result = await contract.functions[method](...args);
    // this will work only for methods that have a single return value
    const actualResult = result[0]
    console.debug("Result is: ", actualResult);
    return actualResult;
  } catch (error) {
    const msg = (error as Error).message;
    console.error("Error messsage: ", msg);
    throwError(msg);
  }
};

const send = async (method: string, ...args: any[]) => {
  console.log("Calling method: ", method, ", with args: ", args);
  try {
    const contract = new ethers.Contract(contractAddress, ABI, getSigner());
    const tx = await contract.functions[method](...args);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    const msg = (error as Error).message;
    console.log("Error messsage: ", msg);
    throwError(msg);
  }
};

// write calls
export const allow = async (addresses: string[]) => send("addAllow", addresses);
export const revoke = async (addresses: string[]) =>
  send("revokeAllow", addresses);
export const mint = async (share: string, uri: string) =>
  send("safeMint", share, uri);

// read calls
export const owner = async () => callMethod("owner");
export const isAddressAllowed = async (address: string) =>
  callMethod("isAddressAllowed", address);
