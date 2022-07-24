import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Wrapper: FC<Props> = ({ children }) => {
  return <Box>{chilren}</Box>;
};

export default Wrapper;
