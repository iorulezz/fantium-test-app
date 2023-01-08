import {
  Button,
  Radio,
  RadioGroup,
  useToast,
  Textarea,
  HStack,
  ButtonGroup,
  Container,
  Divider,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { allow, owner, revoke } from "../helpers/contract";

export const TokenViewer = () => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [contractOwner, setOwner] = useState("");
  const [editType, setEditType] = useState("revoke");
  const [addressList, setAddresslist] = useState("");

  const splitAddressesIgnoreEmpty = () =>
    addressList.split("\n").filter((address) => address !== "");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const txHash =
        editType === "allow"
          ? await allow(splitAddressesIgnoreEmpty())
          : await revoke(splitAddressesIgnoreEmpty());
      toast({
        title: "Transaction successfully submitted.",
        description: (
          <>
            Tx hash: {"\n"}
            <a
              href={`https://goerli.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {txHash}
            </a>
            .
          </>
        ),
        status: "success",
        duration: 10000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Request failed",
        description: (error as Error)?.message,
        status: "error",
        duration: 10000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setAddresslist("");
    }
  };

  const isAddressesValid = () => {
    const validEthAddressRegEx = /^0x[a-fA-F0-9]{40}$/;
    const addressArray = splitAddressesIgnoreEmpty();
    if (addressArray && addressArray.length > 0) {
      return addressArray.every((address) =>
        validEthAddressRegEx.test(address)
      );
    } else return false;
  };

  useEffect(() => {
    const updateOwner = async () => {
      setOwner(await owner());
    };
    updateOwner();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={4} direction="column" justify="center" align="stretch">
        <Container textAlign="center">
          This form is used to manage the allow list. Only the contract owner
          can submit such transactions; otherwise, they will be reverted. The
          current contract owner is {contractOwner}.
        </Container>
        <Divider />
        <Textarea
          isInvalid={!isAddressesValid()}
          resize={"both"}
          value={addressList}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setAddresslist(event.currentTarget.value)
          }
        />
        <RadioGroup defaultValue={editType} onChange={setEditType} mb={6}>
          <HStack spacing={5}>
            <Radio value="revoke">Revoke</Radio>
            <Radio value="allow">Allow</Radio>
          </HStack>
        </RadioGroup>
        <ButtonGroup gap="2">
          <Button
            isLoading={isLoading}
            onClick={() => setAddresslist("")}
            color="gray.50"
            bg="red.600"
            _hover={{ bg: "red.500" }}
          >
            Clear
          </Button>
          <Button
            isLoading={isLoading}
            disabled={!isAddressesValid()}
            type="submit"
            color="gray.50"
            bg="blackAlpha.800"
            _hover={{ bg: "blackAlpha.600" }}
          >
            Submit
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  );
};
