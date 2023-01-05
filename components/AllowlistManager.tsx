import {
  Button,
  Stack,
  Radio,
  RadioGroup,
  useToast,
  Textarea,
  HStack,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const AllowlistManager = () => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [editType, setEditType] = useState("revoke");
  const [addressList, setAddresslist] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      toast({
        title: "sample response",
        description: "You may now use this vault.",
        status: "success",
        duration: 5000,
        position: "top-right",
      });
    } catch (error) {
      // @todo DRY, needs to be somewhere higher up.
      toast({
        title: "Request failed",
        description: (error as Error)?.message,
        status: "error",
        duration: 5000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {" "}
        This is the allowlist manager page. Page is accessible only to the owner
        of the smart contract.
        <Stack spacing={4} align="stretch">
          <Textarea
            isInvalid
            resize={"both"}
            value={addressList}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setAddresslist(event.currentTarget.value)
            }
            placeholder="The addresses ho here"
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
              colorScheme="red"
            >
              Clear
            </Button>
            <Button isLoading={isLoading} type="submit">
              Submit
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </>
  );
};
