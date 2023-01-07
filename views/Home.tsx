import {
  Stack,
  Container,
  VStack,
  StackDivider,
  Center,
} from "@chakra-ui/react";

export const Home = () => {
  return (
    <Stack align="center" justify="center" direction={"column"}>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing="20px">
        <Center>
          <Container maxW="md">Hello, there sports fan! 👋 🎾</Container>
        </Center>
        <Container maxW="md">Please use the header menu to navigate.</Container>
      </VStack>
    </Stack>
  );
};
