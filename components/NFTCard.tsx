import {
    Divider,
    Image,
    Heading,
    Flex,
    Text,
    Card,
    CardBody,
    CardFooter,
    Stack,
    Tooltip,
    Link,
  } from "@chakra-ui/react";
  //import type { NonFungibleToken } from "../types/NonFungibleToken";
  
  type Props = {
    nft: string;
    footer?: JSX.Element;
  };
  
  export const NftCard = (props: Props) => {
    const { footer, nft } = props;
  
    return (
      <Card maxW="md">
        <CardBody>
          <Image
            objectFit="cover"
            src={"/favicon.png"}
            alt=""
            borderRadius="lg"
          />
          <Stack my={8} gap={4}>
            <Heading size="md">Heading</Heading>
            <Text>Description</Text>
          </Stack>
          <Flex gap={4} mt={4} direction="row" alignItems="center">
            <Tooltip label="Goerli" fontSize="md">
              <Image
                w="24px"
                src="http://localhost:4000/assets/logos/ethereum.svg"
                alt="Ethereum"
              />
            </Tooltip>
            <Link href={"http://google.com"} isExternal>
              <Image
                w="32px"
                src="http://localhost:4000/assets/logos/opensea.svg"
                alt="Opensea"
              />
            </Link>
            <Tooltip
              label="This is an estimation of the current market value."
              fontSize="md"
            >
              <Text ml="auto" color="blue.600" fontSize="xl">
                1 ETH
              </Text>
            </Tooltip>
          </Flex>
        </CardBody>
        <Divider />
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    );
  };
  