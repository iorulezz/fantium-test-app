import { Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Home = () => {
  const router = useRouter();

  return (
    <Stack alignItems={"start"}>
      <Text>Hello, there! 👋</Text>
    </Stack>
  );
};
