import { Box, List } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/PageTitle";
import AccountInfo from "../features/wallet/AccountInfo";
import { getAccounts, loadAccounts } from "../features/wallet/WalletSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function WalletPage() {
  const { t } = useTranslation();
  const accounts = useAppSelector(getAccounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAccounts());
  }, []);

  return (
    <Box>
      <PageTitle label={t("wallet.accounts")} />

      <List spacing={4}>
        {accounts.map((address, index) => {
          return <AccountInfo key={index} address={address} />;
        })}
      </List>
    </Box>
  );
}

export default WalletPage;
