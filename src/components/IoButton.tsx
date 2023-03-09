import { Button, ButtonProps } from "@chakra-ui/react";
import Icon from "@mdi/react";

export interface IoButtonProps extends ButtonProps {
  label?: string;
  icon?: string;
}

function IoButton({ label, icon, ...props }: IoButtonProps) {
  return (
    <Button {...props}>
      {icon && <Icon path={icon} size={1} />}
      {label || props.children}
    </Button>
  );
}

IoButton.defaultProps = {
  colorScheme: "primary",
  fontWeight: 400,
  columnGap: 2,
};

export default IoButton;
