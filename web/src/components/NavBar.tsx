import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

type Props = {};

const NavBar = (props: Props) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching: mefetching }] = useMeQuery();

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
      <Flex align={"center"}>
        <NextLink href={"/create-post"}>
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
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
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="tan"
      p={4}
      ml="auto"
      align={"center"}
    >
      <Flex flex={1} m={"auto"} maxW={800}>
        <NextLink href={"/"}>
          <Link>
            <Heading>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
