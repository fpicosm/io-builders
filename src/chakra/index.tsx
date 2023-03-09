import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";

import {
  baseTheme,
  ChakraProvider as Provider,
  ChakraProviderProps,
  extendTheme,
} from "@chakra-ui/react";

function ChakraProvider({ children }: ChakraProviderProps) {
  const theme = extendTheme({
    colors: {
      primary: {
        500: baseTheme.colors.blue[500],
        600: baseTheme.colors.blue[600],
      },

      deposit: {
        500: baseTheme.colors.gray[800],
        600: baseTheme.colors.gray[700],
      },

      transfer: {
        500: baseTheme.colors.gray[500],
        600: baseTheme.colors.gray[400],
      },
    },
    fonts: {
      heading: `'Ubuntu', sans-serif`,
      body: `'Ubuntu', sans-serif`,
    },
  });

  return <Provider theme={theme}>{children}</Provider>;
}

export default ChakraProvider;
