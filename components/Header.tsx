import {
  Button,
  Box,
  Flex,
  Spacer,
  Heading,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getConnectedAccount, isMetaMaskInstalled } from "../helpers/accounts";

export const Header = () => {
  const router = useRouter();
  const toast = useToast();
  const [connectedAddress, setConnectedAddress] = useState("");

  async function connectAccount() {
    if (isMetaMaskInstalled()) {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAddress(await getConnectedAccount());
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
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">
          <Link href={"/"}>Fantium Test App</Link>
        </Heading>
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
