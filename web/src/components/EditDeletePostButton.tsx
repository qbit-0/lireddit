import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

type Props = {
  id: number;
  creatorId: number;
};

const EditDeletePostButton: FC<Props> = ({ id, creatorId }) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) return null;

  return (
    <Box>
      <NextLink href={"/post/edit/[id]"} as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          aria-label={"Edit Post"}
          icon={<EditIcon />}
        />
      </NextLink>

      <IconButton
        onClick={() => {
          deletePost({ id: id });
        }}
        aria-label={"Delete Post"}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default EditDeletePostButton;
