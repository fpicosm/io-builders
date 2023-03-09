import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

export interface IoInputProps extends Omit<InputProps, "onChange"> {
  label?: string;
  error?: string;
  helper?: string;
  onChange: (value: string) => void;
}

function IoInput({
  label,
  error,
  helper,
  value,
  onChange,
  ...props
}: IoInputProps) {
  return (
    <FormControl {...props}>
      {label && <FormLabel fontWeight={400}>{label}</FormLabel>}
      <Input
        {...props}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
      />
      {helper && <FormHelperText>{helper}</FormHelperText>}
      <FormErrorMessage fontWeight={500}>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default IoInput;
