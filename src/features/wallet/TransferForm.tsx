import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import Web3 from "web3";
import { Page } from "../../App";
import IoButton from "../../components/IoButton";
import IoInput from "../../components/IoInput";
import IoSelect from "../../components/IoSelect";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAccounts, sendTransaction } from "./WalletSlice";

const web3 = new Web3(process.env.REACT_APP_WEB3_URL as string);

const Steps = Object.freeze({
  SET_FROM: 0,
  SET_TO: 1,
  SET_AMOUNT: 2,
});

function AccordionStep(props: {
  label: string;
  children: JSX.Element;
  onSelect?: () => void;
}) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton onClick={props.onSelect}>
          <Box flex={1} textAlign="left" overflow="hidden">
            {props.label}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel>{props.children}</AccordionPanel>
    </AccordionItem>
  );
}

function SelectFrom(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation();
  const accounts = useAppSelector(getAccounts);
  const placeholder = t("label.select", { count: 1 });

  return (
    <IoSelect
      isRequired
      isInvalid={!props.value}
      options={accounts}
      placeholder={placeholder}
      {...props}
    />
  );
}

function SelectTo({
  from,
  ...props
}: {
  from: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const accounts = useAppSelector(getAccounts);
  const options = accounts.filter((address) => address !== from);
  const { t } = useTranslation();
  const placeholder = t("label.select", { count: 1 });

  return (
    <IoSelect
      isRequired
      isInvalid={!props.value}
      options={options}
      placeholder={placeholder}
      {...props}
    />
  );
}

function SelectAmount({
  max,
  ...props
}: {
  max: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const min = 0.01;

  return (
    <Flex>
      <IoInput
        isRequired
        borderRightRadius={0}
        min={min}
        max={max}
        isInvalid={!props.value}
        helper={`min: ${min} / max: ${max}`}
        placeholder="Insert amount"
        step={0.01}
        type="number"
        {...props}
      />

      <IoButton
        borderLeftRadius={0}
        px={8}
        label="Select max"
        onClick={() => props.onChange(max)}
      />
    </Flex>
  );
}

function TransferForm() {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    from: "",
    to: "",
    value: "",
  });

  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  useEffect(() => {
    const from = searchParams.get("from");
    if (!from) return;

    setStep(Steps.SET_TO);
    setForm({ ...form, from });
  }, [searchParams]);

  const [balance, setBalance] = useState("");
  useEffect(() => {
    if (!form.from) return;

    setTimeout(async () => {
      const bn = await web3.eth.getBalance(form.from);
      const balance = web3.utils.fromWei(bn, "ether");
      setBalance(balance);
    }, 0);
  }, [form.from]);

  const max = parseFloat(balance).toLocaleString(i18n.language, {
    style: "decimal",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  const handleErrors = async () => {
    if (!form.from) return setStep(Steps.SET_FROM);
    if (!form.to) return setStep(Steps.SET_TO);
    if (!form.value) return setStep(Steps.SET_AMOUNT);
    return submitForm();
  };

  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = async () => {
    const data = {
      ...form,
      value: web3.utils.toWei(form.value),
    };

    try {
      await dispatch(sendTransaction(data));

      toast({
        title: "Transfer done.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate(Page.WALLET);
    } catch (err) {
      console.log(err);
    }
  };

  const getLabel = (key: string, value?: string | number) => {
    return [t(key), value].filter((val) => !!val).join(": ");
  };

  return (
    <form style={{ height: "100%" }} onSubmit={handleSubmit}>
      <Flex direction="column" height="100%">
        <Accordion index={step} flex={1}>
          <AccordionStep
            label={getLabel("transfer.from", form.from)}
            onSelect={() => setStep(Steps.SET_FROM)}
          >
            <SelectFrom
              value={form.from}
              onChange={(from: string) => {
                setForm({ ...form, from });
                from && setStep(Steps.SET_TO);
              }}
            />
          </AccordionStep>

          <AccordionStep
            label={getLabel("transfer.to", form.to)}
            onSelect={() => setStep(Steps.SET_TO)}
          >
            <SelectTo
              from={form.from}
              value={form.to}
              onChange={(to: string) => {
                setForm({ ...form, to });
                to && setStep(Steps.SET_AMOUNT);
              }}
            />
          </AccordionStep>

          <AccordionStep
            label={getLabel("transfer.amount", form.value)}
            onSelect={() => setStep(Steps.SET_AMOUNT)}
          >
            <SelectAmount
              max={max}
              value={form.value}
              onChange={(value: string) => setForm({ ...form, value })}
            />
          </AccordionStep>
        </Accordion>

        <Spacer />

        <IoButton onClick={handleErrors}>{t("label.submit")}</IoButton>
      </Flex>
    </form>
  );
}

export default TransferForm;
