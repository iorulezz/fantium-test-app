import {
  Button,
  Box,
  Flex,
  Spacer,
  Heading,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Header = () => {
  const router = useRouter();
  const toast = useToast();
  const [connectedAddress, setConnectedAddress] = useState("");

  async function setConnectedAccount() {
    const accounts = await window.ethereum.request<string[]>({
      method: "eth_accounts",
    });
    if (accounts) {
      const account = accounts[0];
      if (account) setConnectedAddress(account);
      else setConnectedAddress("");
    }
  }

  async function connectAccount() {
    if (isMetaMaskInstalled()) {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await setConnectedAccount();
    } else {
      toast({
        title: "Metamask not found!",
        description: "Please install the Metamask extension to continue.",
        status: "warning",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    }
  }

  function isMetaMaskInstalled() {
    return Boolean(
      typeof window !== "undefined" &&
        window.ethereum &&
        window.ethereum.isMetaMask
    );
  }

  if (typeof window !== "undefined" && isMetaMaskInstalled()) {
    window.ethereum.on("accountsChanged", async () => {
      await setConnectedAccount();
    });
  }

  useEffect(() => {
    const updateAccount = async () => {
      await setConnectedAccount();
    };
    updateAccount();
  }, []);

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">Fantium Test App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <Button
          isDisabled={connectedAddress === ""}
          onClick={() => router.push("/admin")}
          colorScheme="teal"
        >
          Admin
        </Button>
        <Button
          isDisabled={connectedAddress === ""}
          onClick={() => router.push("/mint")}
          colorScheme="teal"
        >
          Mint
        </Button>
        {connectedAddress === "" ? (
          <Button onClick={() => connectAccount()} colorScheme="teal">
            Connect
          </Button>
        ) : (
          <Button colorScheme="teal">{connectedAddress}</Button>
        )}
      </ButtonGroup>
    </Flex>
  );
};
