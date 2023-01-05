import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Minter } from "../components/Minter";
import { getConnectedAccount } from "../helpers/accounts";

export const Mint = () => {
  const [connectedAddress, setConnectedAddress] = useState("");

  useEffect(() => {
    const updateAccount = async () => {
      setConnectedAddress(await getConnectedAccount());
    };
    updateAccount();
  }, []);

  return (
    <Stack alignItems={"start"}>
      {connectedAddress === "" ? (
        <Text>No account connected!</Text>
      ) : (
        <Minter />
      )}
    </Stack>
  );
};
