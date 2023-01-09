import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TokenViewer } from "../components";
import { getConnectedAccount, isMetaMaskInstalled } from "../helpers/accounts";
import { balanceOf, checkConnectedChainId } from "../helpers/contract";

export const Tokens = () => {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [isCorrectChainId, setCorrectChainId] = useState(false);
  const [balance, setBalance] = useState(0);

  const updateAccount = async () => {
    setConnectedAddress(await getConnectedAccount());
  };
  const updateChain = async () => {
    setCorrectChainId(await checkConnectedChainId());
  };
  const updateBalance = async () => {
    isCorrectChainId && connectedAddress !== ""
      ? setBalance((await balanceOf(connectedAddress)).toNumber())
      : setBalance(0);
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

  useEffect(() => {
    updateBalance();
  }, [isCorrectChainId, connectedAddress]);

  return (
    <Stack align="center" justify="center">
      {!isCorrectChainId ? (
        <Text>Please connect to Goerli to proceed.</Text>
      ) : connectedAddress === "" ? (
        <Text>Please connect account to proceed.</Text>
      ) : balance > 0 ? (
        <TokenViewer balance={balance} connectedAddress={connectedAddress} />
      ) : (
        <Text>You have no tokens.</Text>
      )}
    </Stack>
  );
};
