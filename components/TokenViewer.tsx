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
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { allow, owner, revoke } from "../helpers/contract";

type Props = {
  balance: number;
};

export const TokenViewer = (props: Props) => {
  const { balance } = props;
  console.log(balance);

  return (
    <Stack spacing={4} direction="column" justify="center" align="stretch">
      <Text>Balance is {balance}</Text>
    </Stack>
  );
};
