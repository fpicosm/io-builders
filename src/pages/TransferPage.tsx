import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/PageTitle";
import TransferForm from "../features/wallet/TransferForm";
import { loadAccounts } from "../features/wallet/WalletSlice";
import { useAppDispatch } from "../store/hooks";

function TransferPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAccounts());
  }, []);

  return (
    <Flex direction="column" height="100%">
      <PageTitle label={t("wallet.transfer")} />
      <TransferForm />
    </Flex>
  );
}

export default TransferPage;
