import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Minter } from "../components/Minter";
import { getConnectedAccount, isMetaMaskInstalled } from "../helpers/accounts";

export const Mint = () => {
  const [connectedAddress, setConnectedAddress] = useState("");

  if (typeof window !== "undefined" && isMetaMaskInstalled()) {
    window.ethereum.on("accountsChanged", async () => {
      setConnectedAddress(await getConnectedAccount());
    });
  }

  useEffect(() => {
    const updateAccount = async () => {
      setConnectedAddress(await getConnectedAccount());
    };
    updateAccount();
  }, []);

  return (
    <Stack align="center" justify="center">
      {connectedAddress === "" ? (
        <Text>Please connect account to proceed.</Text>
      ) : (
        <Minter />
      )}
    </Stack>
  );
};
