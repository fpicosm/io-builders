import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export interface AccountMovementsProps {
  address: string;
}

function AccountMovements({ address }: AccountMovementsProps) {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const web3 = new Web3(process.env.REACT_APP_WEB3_URL as string);

  useEffect(() => {
    web3.eth.getTransactionCount(address).then(setCount);
  }, []);

  if (!count) return <span></span>;

  return (
    <Accordion allowToggle width="100%">
      <AccordionItem border={0}>
        <AccordionButton>
          <Box flex={1} textAlign="center">
            {t("wallet.movements", { count })}
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AccountMovements;
