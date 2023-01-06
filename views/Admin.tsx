import { Center, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AllowlistManager } from "../components/AllowlistManager";
import { getConnectedAccount } from "../helpers/accounts";

export const Admin = () => {
  const [connectedAddress, setConnectedAddress] = useState("");

  useEffect(() => {
    const updateAccount = async () => {
      setConnectedAddress(await getConnectedAccount());
    };
    updateAccount();
  }, []);

  return (
      <Stack align="center" justify="center">
        {connectedAddress === "" ? (
          <Text>No account connected!</Text>
        ) : (
          <AllowlistManager />
        )}
      </Stack>
  );
};
