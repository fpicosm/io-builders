import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import {
  mdiMenu,
  mdiWalletOutline,
  mdiBankTransferIn,
  mdiBankTransferOut,
} from "@mdi/js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation } from "react-router";
import { Page } from "../App";
import IoButton from "../components/IoButton";
import IoDrawer from "../components/IoDrawer";
import IoLink from "../components/IoLink";
import IoToolbar from "../components/IoToolbar";
import { getUser } from "../features/auth/AuthSlice";
import LogoutButton from "../features/auth/LogoutButton";
import { useAppSelector } from "../store/hooks";

function MainLayout() {
  const user = useAppSelector(getUser);
  const location = useLocation();

  // redirects to login page when user is not authenticated
  if (!user) {
    return <Navigate to={Page.LOGIN} state={{ from: location }} replace />;
  }

  const { t } = useTranslation();
  const routes = [
    {
      to: "/",
      icon: mdiWalletOutline,
      label: t("router.wallet"),
    },
    {
      to: Page.MAKE_DEPOSIT,
      icon: mdiBankTransferIn,
      label: t("router.deposit"),
    },
    {
      to: Page.MAKE_TRANSFER,
      icon: mdiBankTransferOut,
      label: t("router.transfer"),
    },
  ];

  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Flex direction="column" className="main-layout">
      <IoToolbar padding={2}>
        <IoButton
          p={0}
          aria-label="Menu"
          icon={mdiMenu}
          onClick={() => setShowDrawer(true)}
        />
      </IoToolbar>

      <IoDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)}>
        <Box p={4} fontWeight={500} fontSize={25}>
          {t("user.welcome", user)}
        </Box>

        {routes.map((link, index) => (
          <IoLink {...link} p={4} key={index} />
        ))}

        <Spacer />

        <LogoutButton margin={4} />
      </IoDrawer>

      <Container maxW="container.lg" flex={1} p={4}>
        <Outlet />
      </Container>
    </Flex>
  );
}

export default MainLayout;
