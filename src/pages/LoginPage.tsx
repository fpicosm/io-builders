import { Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Page } from "../App";
import IoButton from "../components/IoButton";
import LoginForm from "../features/auth/LoginForm";

function LoginPage() {
  const { t } = useTranslation();

  return (
    <Container maxW="md" display="flex" flexDirection="column" rowGap={6}>
      <LoginForm />

      <span>{t("label.or")}</span>

      <Link to={Page.REGISTER}>
        <IoButton variant="outline" width="100%">
          {t("router.register")}
        </IoButton>
      </Link>
    </Container>
  );
}

export default LoginPage;
