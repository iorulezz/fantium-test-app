import {
  Image,
  Heading,
  Flex,
  Text,
  Card,
  CardBody,
  Stack,
  Tooltip,
  Link,
  StackDivider,
  HStack,
  OrderedList,
  ListItem,
  Box,
  Spacer,
  Container,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { tokenOfOwnerByIndex, tokenURI } from "../helpers/contract";
import { resolveIpfs } from "../helpers/ipfs";
import { NFTData } from "../types/NFTData";
import { NFTMetadata } from "../types/NFTMetadata";

type Props = {
  connectedAddress: string;
  index: number;
};

export const NFTCard = (props: Props) => {
  const toast = useToast();
  const { connectedAddress, index } = props;
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [uriJson, setTokenURI] = useState<NFTMetadata | null>(null);
  const [nftData, setNFTData] = useState<NFTData | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getTokenId = async () => {
      setTokenId(await tokenOfOwnerByIndex(connectedAddress, index));
    };
    getTokenId();
  }, [connectedAddress, index]);

  const getExplorerUrl = () =>
    `https://goerli.etherscan.io/token/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}?a=${tokenId}`;

  useEffect(() => {
    const getTokenURI = async () => {
      setLoading(true);
      try {
        if (tokenId) {
          const tokenURIResponse = await tokenURI(tokenId);
          const base64EncodedData = tokenURIResponse.split(",")[1];
          const jsonString = Buffer.from(
            base64EncodedData,
            "base64"
          ).toString();
          var json: NFTMetadata = JSON.parse(jsonString);
          console.info(json);
          setTokenURI(json);
          const ipfsResponse = await resolveIpfs(json.NFTData);
          const nftData: NFTData = ipfsResponse;
          setNFTData(nftData);
        } else {
          setTokenURI(null);
        }
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
    getTokenURI();
  }, [tokenId]);

  return (
    <Card maxW="md" fontSize={"sm"} my={4}>
      <CardBody>
        <Stack gap={2} divider={<StackDivider />}>
          <Flex gap={2}>
            <Image
              src={"/favicon.png"}
              alt="F"
              borderRadius="full"
              boxSize="24px"
            />
            <Heading size="sm">{uriJson?.name}</Heading>
            <Spacer />
            {isLoading ? (
              <Tooltip label="Resolving NFTData..." fontSize="sm">
                <Spinner />
              </Tooltip>
            ) : (
              <Tooltip label="Goerli" fontSize="sm">
                <Link href={getExplorerUrl()} target="_blank">
                  <Image w="12px" src="/ethereum.svg" alt="Ethereum" />
                </Link>
              </Tooltip>
            )}
          </Flex>
          <HStack divider={<StackDivider />}>
            <Box w="100px">
              <Text fontWeight={"bold"}>Description</Text>
            </Box>
            <Box w="220px">
              <Container>
                <Text fontStyle={"italic"}>{uriJson?.description}</Text>
              </Container>
            </Box>
          </HStack>
          <HStack divider={<StackDivider />}>
            <Box w="100px">
              <Text fontWeight={"bold"}>Share</Text>
            </Box>
            <Box w="220px">
              <Text textAlign={"center"}>{uriJson?.share} %</Text>
            </Box>
          </HStack>
          <HStack divider={<StackDivider />}>
            <Box w="100px">
              <Text fontWeight={"bold"}>Athlete</Text>
            </Box>
            <Box w="220px">
              <Text textAlign={"center"}>{nftData?.athlete}</Text>
            </Box>
          </HStack>
          <HStack divider={<StackDivider />}>
            <Box w="100px">
              <Text fontWeight={"bold"}>Season</Text>
            </Box>
            <Box w="220px">
              <Text textAlign={"center"}>{nftData?.season}</Text>
            </Box>
          </HStack>
          <HStack divider={<StackDivider />}>
            <Box w="100px">
              <Text fontWeight={"bold"}>Benefits</Text>
            </Box>
            <Box w="220px" h="auto">
              <OrderedList textAlign={"center"}>
                <ListItem>{nftData?.benefits.benefit1}</ListItem>
                <ListItem>{nftData?.benefits.benefit2}</ListItem>
              </OrderedList>
            </Box>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};
