import { Center, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AllowlistManager } from "../components/AllowlistManager";
import { getConnectedAccount, isMetaMaskInstalled } from "../helpers/accounts";

export const Admin = () => {
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
          <AllowlistManager />
        )}
      </Stack>
  );
};
