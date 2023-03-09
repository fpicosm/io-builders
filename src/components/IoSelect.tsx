import { Select, SelectProps } from "@chakra-ui/react";
import { ChangeEvent } from "react";

export interface IoSelectProps extends Omit<SelectProps, "onChange"> {
  onChange: (value: string) => void;
  options?: Array<string>;
}

function IoSelect({ value, options, onChange, ...props }: IoSelectProps) {
  return (
    <Select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
      }}
      {...props}
    >
      {options?.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </Select>
  );
}

export default IoSelect;
