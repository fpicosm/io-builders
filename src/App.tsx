import { useRoutes } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import MainLayout from "./layouts/MainLayout";
import DepositPage from "./pages/DepositPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransferPage from "./pages/TransferPage";
import WalletPage from "./pages/WalletPage";
import "./App.scss";

export const Page = Object.freeze({
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  WALLET: "/wallet",
  MAKE_DEPOSIT: "/deposit",
  MAKE_TRANSFER: "/transfer",
});

function App() {
  const routes = useRoutes([
    {
      path: "/auth",
      element: <GuestLayout />,
      children: [
        {
          path: Page.LOGIN,
          element: <LoginPage />,
        },
        {
          path: Page.REGISTER,
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: Page.WALLET,
          element: <WalletPage />,
        },
        {
          path: Page.MAKE_DEPOSIT,
          element: <DepositPage />,
        },
        {
          path: Page.MAKE_TRANSFER,
          element: <TransferPage />,
        },
        {
          path: "/",
          element: <WalletPage />,
        },
      ],
    },

    {
      path: "*",
      element: <h1>Not found</h1>,
    },
  ]);

  return routes;
}

export default App;
