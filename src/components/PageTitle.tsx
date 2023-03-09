import { Heading } from "@chakra-ui/react";

export interface PageTitleProps {
  label: string;
}

function PageTitle({ label }: PageTitleProps) {
  return (
    <Heading as="h1" mb={4} pb={4} borderBottomWidth={1} fontWeight={500}>
      {label}
    </Heading>
  );
}

export default PageTitle;
