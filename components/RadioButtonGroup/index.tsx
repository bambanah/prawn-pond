import Label from "@Components/forms/Label";
import { Field } from "formik";
import React from "react";
import {
  LabelContainer,
  RadioButtonGroupContainer,
  RadioButtonRowContainer
} from "./styles";

type RadioOption = {
  value: any;
  label: string;
};

interface RadioButtonGroupProps {
  options: RadioOption[];
  label: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  label
}) => (
  <>
    <LabelContainer id={`${label}-radio-group`}>
      <h3>{label}</h3>
    </LabelContainer>
    <RadioButtonGroupContainer
      role="group"
      aria-labelledby={`${label}-radio-group`}
    >
      {options.map((option) => (
        <Label htmlFor="category">
          <RadioButtonRowContainer>
            <Field type="radio" name="category" value={option.value} />
            {option.label}
          </RadioButtonRowContainer>
        </Label>
      ))}
    </RadioButtonGroupContainer>
  </>
);

export default RadioButtonGroup;
