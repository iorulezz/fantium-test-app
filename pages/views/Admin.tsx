import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AllowlistManager } from "../components/AllowlistManager";

export const Admin = () => {
  const [connectedAddress, setConnectedAddress] = useState("");

  async function getConnectedAccount() {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    return accounts[0];
  }

  useEffect(() => {
    const updateAccount = async () => {
      const account = await getConnectedAccount();
      if (account) {
        setConnectedAddress(account);
      } else setConnectedAddress("");
    };
    updateAccount();
  }, []);

  return (
    <Stack alignItems={"start"}>
      {connectedAddress === "" ? (
        <Text>No account connected!</Text>
      ) : (
        <AllowlistManager />
      )}
    </Stack>
  );
};
