import { Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Page } from "../App";
import IoButton from "../components/IoButton";
import RegisterForm from "../features/auth/RegisterForm";

function RegisterPage() {
  const { t } = useTranslation();

  return (
    <Container maxW="md" display="flex" flexDirection="column" rowGap={6}>
      <RegisterForm />

      <span>{t("label.or")}</span>

      <Link to={Page.LOGIN}>
        <IoButton variant="outline" width="100%">
          {t("router.login")}
        </IoButton>
      </Link>
    </Container>
  );
}

export default RegisterPage;
