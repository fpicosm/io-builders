import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from "@chakra-ui/react";

function IoDrawer(props: DrawerProps) {
  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent>{props.children}</DrawerContent>
    </Drawer>
  );
}

IoDrawer.defaultProps = {
  placement: "left",
};

export default IoDrawer;
