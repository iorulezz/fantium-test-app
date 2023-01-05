import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  StackDivider,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { uploadNFTData } from "../helpers/ipfs";

export const Minter = () => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [share, setShare] = useState<string>("");
  const [athlete, setAthlete] = useState<string>("");
  const [season, setSeason] = useState<number>(1);
  const [benefit1, setBenefit1] = useState<string>("");
  const [benefit2, setBenefit2] = useState<string>("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await uploadNFTData({
        athlete,
        season,
        benefits: {
          benefit1,
          benefit2,
        },
      });

      console.info(response);

      toast({
        title: response["IpfsHash"],
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
      {" "}
      This is the minter page!
      <form onSubmit={onSubmit}>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <FormControl isRequired>
            <FormLabel>Share</FormLabel>
            <InputGroup>
              <Input
                value={share}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setShare(event.currentTarget.value)
                }
              />
              <InputRightAddon children="%" />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Athlete</FormLabel>
            <Input
              value={athlete}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setAthlete(event.currentTarget.value)
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Season</FormLabel>
            <NumberInput
              max={20}
              min={1}
              value={season}
              onChange={(valueAsString: string, valueAsNumber: number) =>
                setSeason(valueAsNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Benefit 1</FormLabel>
              <Input
                value={benefit1}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setBenefit1(event.currentTarget.value)
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Benefit 2</FormLabel>
              <Input
                value={benefit2}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setBenefit2(event.currentTarget.value)
                }
              />
            </FormControl>
          </VStack>
          <Button isLoading={isLoading} type="submit">
            Create Vault
          </Button>
        </VStack>
      </form>
    </>
  );
};

