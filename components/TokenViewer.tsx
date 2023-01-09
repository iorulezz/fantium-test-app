import { Stack, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { NFTCard } from "./NFTCard";

type Props = {
  balance: number;
  connectedAddress: string;
};

export const TokenViewer = (props: Props) => {
  const { balance, connectedAddress } = props;
  const cards: JSX.Element[] = [];

  for (let i = 0; i < balance; i++) {
    cards.push(
      <NFTCard key={i} index={i} connectedAddress={connectedAddress} />
    );
  }

  return (
    <Stack gap={12}>
      <Flex direction="row" gap={4}>
        <Wrap>
          {cards.map((nftCard, index) => (
            <WrapItem key={index}>{nftCard}</WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Stack>
  );
};
