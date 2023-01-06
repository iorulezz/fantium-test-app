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
import { mint } from "../helpers/contract";
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
      const ipfsResponse = await uploadNFTData({
        athlete,
        season,
        benefits: {
          benefit1,
          benefit2,
        },
      });

      const uri = `ipfs://${ipfsResponse["IpfsHash"]}`;

      const txHash = await mint(share, uri);

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
              <InputRightAddon>%</InputRightAddon>
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
            Mint NFT
          </Button>
        </VStack>
      </form>
    </>
  );
};
