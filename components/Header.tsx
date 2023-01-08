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
import {
  getConnectedAccount,
  isMetaMaskInstalled,
  sliceAddress,
} from "../helpers/accounts";

export const Header = () => {
  const router = useRouter();
  const toast = useToast();
  const [connectedAddress, setConnectedAddress] = useState("");

  const connectAccount = async () => {
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
  };

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
            onClick={() => router.push("/mint")}
            bg="#bcff1e"
            color="blackAlpha.800"
            _hover={{ bg: "#e1ff99" }}
          >
            Mint
          </Button>
          <Button
            isDisabled={connectedAddress === ""}
            onClick={() => router.push("/tokens")}
            bg="#bcff1e"
            color="blackAlpha.800"
            _hover={{ bg: "#e1ff99" }}
          >
            My Tokens
          </Button>
          <Button
            isDisabled={connectedAddress === ""}
            onClick={() => router.push("/admin")}
            bg="#bcff1e"
            color="blackAlpha.800"
            _hover={{ bg: "#e1ff99" }}
          >
            Admin
          </Button>

          {connectedAddress === "" ? (
            <Button
              onClick={connectAccount}
              bg="#bcff1e"
              color="blackAlpha.800"
              _hover={{ bg: "#e1ff99" }}
            >
              Connect
            </Button>
          ) : (
            <Button
              bg="#bcff1e"
              color="blackAlpha.800"
              _hover={{ bg: "#e1ff99" }}
            >
              {sliceAddress(connectedAddress)}
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
