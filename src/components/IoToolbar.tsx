import { Box, BoxProps } from "@chakra-ui/react";

function IoToolbar(props: BoxProps) {
  return <Box {...props}></Box>;
}

IoToolbar.defaultProps = {
  bgColor: "primary.500",
  color: "white",
  paddingY: 2,
};

export default IoToolbar;
