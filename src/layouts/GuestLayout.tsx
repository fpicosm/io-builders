import { Center } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router";
import { getUser } from "../features/auth/AuthSlice";
import { useAppSelector } from "../store/hooks";

function GuestLayout() {
  const user = useAppSelector(getUser);

  // redirects to home page when user is authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Center textAlign="center">
      <Outlet />
    </Center>
  );
}

export default GuestLayout;
