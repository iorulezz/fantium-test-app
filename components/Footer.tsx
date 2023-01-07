import { HStack, Link, Text } from "@chakra-ui/react";

export const Footer = () => (
  <HStack justify={"center"} align="center">
    <Text>
      Made by{" "}
      <Link href="https://www.linkedin.com/in/antonisthomas/" isExternal>
        Antonis
      </Link>{" "}
      for{" "}
      <Link href="https://www.fantium.com/" isExternal>
        Fantium
      </Link>
      .
    </Text>
  </HStack>
);
