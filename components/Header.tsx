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
    <Flex minWidth="max-content" alignItems="center" justify="center" gap="2">
      <Box p="2" alignItems="center">
        <Heading size="md">
          <Link href={"/"}>Fantium Test App</Link>
        </Heading>
      </Box>
      <Spacer />
      <Box alignItems="center">
        <ButtonGroup gap="1" alignItems="center" height="50px">
          <Button
            isDisabled={connectedAddress === ""}
            onClick={() => router.push("/admin")}
            bg="orange.300"
            color="blackAlpha.800"
          >
            Admin
          </Button>
          <Button
            isDisabled={connectedAddress === ""}
            onClick={() => router.push("/mint")}
            bg="orange.300"
            color="blackAlpha.800"
            _hover={{ bg: "orange.200" }}
          >
            Mint
          </Button>
          {connectedAddress === "" ? (
            <Button
              onClick={() => connectAccount()}
              bg="orange.300"
              color="blackAlpha.800"
              _hover={{ bg: "orange.200" }}
            >
              Connect
            </Button>
          ) : (
            <Button
              bg="orange.300"
              color="blackAlpha.800"
              _hover={{ bg: "orange.200" }}
            >
              {connectedAddress}
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
