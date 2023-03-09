import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IoButton from "../../components/IoButton";
import { mdiBankTransferIn, mdiBankTransferOut } from "@mdi/js";
import { Page } from "../../App";
import IoLink from "../../components/IoLink";
import AccountMovements from "./AccountMovements";

export interface AccountInfoProps {
  address: string;
}

interface ButtonProps {
  isLoading: boolean;
  colorScheme: string;
  icon: string;
  label: string;
}

function Button(props: ButtonProps) {
  return <IoButton flex={1} pl={2} {...props} />;
}

function AccountInfo({ address }: AccountInfoProps) {
  const web3 = new Web3(process.env.REACT_APP_WEB3_URL as string);
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    setTimeout(async () => {
      const bn = await web3.eth.getBalance(address);
      const balance = web3.utils.fromWei(bn, "ether");
      setBalance(balance);
      setLoading(false);
    }, 0);
  }, [address]);

  const { t, i18n } = useTranslation();
  const formattedBalance = parseFloat(balance).toLocaleString(i18n.language, {
    style: "currency",
    currency: "ETH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <Card bgColor="gray.100" borderRadius={8} overflow="hidden">
      <Stack divider={<StackDivider />} spacing={0}>
        <CardHeader>
          <Heading as="h2" fontSize={24} fontWeight={300}>
            {address}
          </Heading>
        </CardHeader>

        <CardBody>
          <Flex justifyContent="space-between" columnGap={4}>
            <Skeleton
              isLoaded={!loading}
              height="60px"
              width="150px"
              borderRadius={8}
            >
              <Stat>
                <StatLabel as="h3" fontSize={16} fontWeight={400}>
                  {t("wallet.balance")}:
                </StatLabel>
                <StatNumber fontWeight={500}>{formattedBalance}</StatNumber>
              </Stat>
            </Skeleton>

            <Box display="flex" flexDir="column" rowGap={4}>
              <IoLink to={`${Page.MAKE_DEPOSIT}?to=${address}`}>
                <Button
                  isLoading={loading}
                  colorScheme="deposit"
                  icon={mdiBankTransferIn}
                  label={t("router.deposit") as string}
                />
              </IoLink>

              <IoLink to={`${Page.MAKE_TRANSFER}?from=${address}`}>
                <Button
                  isLoading={loading}
                  colorScheme="transfer"
                  icon={mdiBankTransferOut}
                  label={t("router.transfer") as string}
                />
              </IoLink>
            </Box>
          </Flex>
        </CardBody>

        <CardFooter p={0}>
          <AccountMovements address={address} />
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default AccountInfo;
