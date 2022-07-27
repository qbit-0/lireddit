import React, { FC } from "react";
import NavBar from "./NavBar";
import Wrapper, { WrapperVariant } from "./Wrapper";

type Props = {
  variant?: WrapperVariant;
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant="regular">{children}</Wrapper>
    </>
  );
};

export default Layout;
