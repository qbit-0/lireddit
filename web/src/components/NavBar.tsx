import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import useIsHydration from "../utils/hooks/useIsHydration";

type Props = {};

const NavBar = (props: Props) => {
  const isHydration = useIsHydration();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching: mefetching }] = useMeQuery({
    pause: isHydration,
  });

  let body = null;
  // data is loading
  if (mefetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4} ml="auto">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default NavBar;
