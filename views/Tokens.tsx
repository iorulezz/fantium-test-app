import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TokenViewer } from "../components";
import { getConnectedAccount, isMetaMaskInstalled } from "../helpers/accounts";
import { checkConnectedChainId } from "../helpers/contract";

export const Tokens = () => {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [isCorrectChainId, setCorrectChainId] = useState(false);

  const updateAccount = async () => {
    setConnectedAddress(await getConnectedAccount());
  };
  const updateChain = async () => {
    setCorrectChainId(await checkConnectedChainId());
  };

  if (typeof window !== "undefined" && isMetaMaskInstalled()) {
    window.ethereum.on("accountsChanged", async () => {
      updateAccount();
    });
    window.ethereum.on("chainChanged", async () => {
      updateChain();
    });
  }

  useEffect(() => {
    updateChain();
    updateAccount();
  }, []);

  return (
    <Stack align="center" justify="center">
      {!isCorrectChainId ? (
        <Text>Please connect to Goerli to proceed.</Text>
      ) : connectedAddress === "" ? (
        <Text>Please connect account to proceed.</Text>
      ) : (
        <TokenViewer />
      )}
    </Stack>
  );
};
