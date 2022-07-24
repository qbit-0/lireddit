import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  variant?: "small" | "regular";
  children: React.ReactNode;
};

const Wrapper: FC<Props> = ({ variant, children }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
