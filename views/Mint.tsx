import { Container, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Minter } from "../components/Minter";
import { getConnectedAccount, isMetaMaskInstalled } from "../helpers/accounts";
import { checkConnectedChainId, isAddressAllowed } from "../helpers/contract";

export const Mint = () => {
  const [isCorrectChainId, setCorrectChainId] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [isAllowedToMint, setAllowed] = useState(false);

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

  useEffect(() => {
    const updateAllowed = async () => {
      isCorrectChainId && connectedAddress !== ""
        ? setAllowed(await isAddressAllowed(connectedAddress))
        : setAllowed(false);
    };
    updateAllowed();
  }, [isCorrectChainId, connectedAddress]);

  return (
    <Stack align="center" justify="center">
      {!isCorrectChainId ? (
        <Text>Please connect to Goerli to proceed.</Text>
      ) : connectedAddress === "" ? (
        <Text>Please connect account to proceed.</Text>
      ) : (
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          {isAllowedToMint ? (
            <Container maxW="md" textAlign="center">
              The connected address is allowed to mint.
            </Container>
          ) : (
            <Container maxW="md" textAlign="center">
              The connected address is not in the allowlist! Submitted
              transactions will revert.
            </Container>
          )}
          <Minter />
        </VStack>
      )}
    </Stack>
  );
};
