import { Link, LinkProps } from "@chakra-ui/react";
import { Link as ReactLink, useLocation } from "react-router-dom";
import Icon from "@mdi/react";

export interface IoLinkProps extends LinkProps {
  to: string;
  label?: string;
  icon?: string;
  iconSize?: string;
}

function IoLink({ label, icon, iconSize, ...props }: IoLinkProps) {
  const location = useLocation();
  const active = location.pathname === props.to;

  return (
    <Link
      className={`io-link ${active ? "io-link--active" : ""}`}
      display="flex"
      columnGap={4}
      as={ReactLink}
      {...props}
    >
      {icon ? <Icon path={icon} size={iconSize} /> : ""}
      {label || props.children}
    </Link>
  );
}

IoLink.defaultProps = {
  iconSize: 1,
};

export default IoLink;
