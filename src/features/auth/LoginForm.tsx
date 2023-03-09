import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { PayloadAction } from "@reduxjs/toolkit";
import { Flex } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isLoading, login } from "./AuthSlice";
import IoInput from "../../components/IoInput";
import IoButton from "../../components/IoButton";

function LoginForm() {
  const { t } = useTranslation();
  const loading = useAppSelector(isLoading);

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
  }, [username]);

  const dispatch = useAppDispatch();
  const fromPath = useLocation().state?.from?.pathname;
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response: PayloadAction<unknown> = await dispatch(login(username));
    const { error } = response.payload as { error?: string };
    if (error) {
      return setError(error);
    }

    navigate(fromPath || "/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" rowGap={8}>
        <IoInput
          value={username}
          isRequired
          autoFocus
          label={t("user.name") as string}
          placeholder={t("user.name") as string}
          error={error}
          isInvalid={!!error}
          onChange={setUsername}
        />

        <IoButton
          label={t("router.login") as string}
          isLoading={loading}
          type="submit"
        />
      </Flex>
    </form>
  );
}

export default LoginForm;
