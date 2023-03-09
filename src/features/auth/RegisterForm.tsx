import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Flex, useToast } from "@chakra-ui/react";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isLoading, register } from "./AuthSlice";
import IoInput from "../../components/IoInput";
import IoButton from "../../components/IoButton";

function RegisterForm() {
  const { t } = useTranslation();
  const loading = useAppSelector(isLoading);

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
  }, [username]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response: PayloadAction<unknown> = await dispatch(register(username));
    const { error } = response.payload as { error?: string };
    if (error) {
      return setError(error);
    }

    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    navigate("/");
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
          label={t("router.register") as string}
          isLoading={loading}
          type="submit"
        />
      </Flex>
    </form>
  );
}

export default RegisterForm;
