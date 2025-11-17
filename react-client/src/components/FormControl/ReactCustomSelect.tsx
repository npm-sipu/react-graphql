import React from "react";
import Select, {
  type GroupBase,
  type MultiValue,
  type OptionsOrGroups,
  type SingleValue,
} from "react-select";
import { Controller, type Control } from "react-hook-form";

import type { TAny } from "../../schemas/common.schema";

export type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  name: string;
  control: Control<TAny>;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  isMulti?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  error?: string;
  isLoading?: boolean;
  className?: string;
  menuPlacement?: "auto" | "bottom" | "top";
  onValueChange?: (
    value: string | string[] | null | MultiValue<Option> | SingleValue<Option>
  ) => void;
  onDeselect?: () => void;
  hideSelectedOptions?: boolean;
  menuIsOpen?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

const ReactCustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  options,
  isMulti = false,
  isClearable = true,
  isDisabled = false,
  isSearchable = true,
  placeholder = "Select...",
  error,
  isLoading = false,
  className = "",
  menuPlacement = "auto",
  onValueChange,
  onDeselect,
  hideSelectedOptions = false,
  menuIsOpen,
  onFocus,
  onBlur,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select<Option, boolean, GroupBase<Option>>
            {...field}
            options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isSearchable={isSearchable}
            placeholder={placeholder}
            isLoading={isLoading}
            menuPlacement={menuPlacement}
            hideSelectedOptions={hideSelectedOptions}
            menuIsOpen={menuIsOpen}
            onFocus={onFocus}
            onBlur={onBlur}
            value={
              isMulti
                ? (options as Option[]).filter((opt) =>
                    Array.isArray(field.value)
                      ? field.value.includes(opt.value)
                      : false
                  )
                : (options as Option[]).find(
                    (opt) => opt.value === field.value
                  ) ?? null
            }
            onChange={(selected) => {
              let finalValue:
                | string
                | string[]
                | null
                | MultiValue<Option>
                | SingleValue<Option>;

              if (isMulti) {
                const values =
                  (selected as Option[] | null)?.map((opt) => opt.value) ?? [];
                field.onChange(values);
                finalValue = values;
              } else {
                const value = (selected as Option | null)?.value ?? null;
                field.onChange(value);
                finalValue = selected;
                if (!value && typeof onDeselect === "function") {
                  onDeselect(); // Call the external deselect handler
                }
              }

              if (typeof onValueChange === "function") {
                onValueChange(finalValue);
              }
            }}
            classNames={{
              control: (state) =>
                `border rounded-md shadow-sm ${
                  error
                    ? "border-red-500"
                    : state.isFocused
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-gray-300"
                }`,
            }}
            menuPosition='fixed'
            styles={{
              input: (base) => ({
                ...base,
                padding: 0, // Avoids double padding if you have spacing in valueContainer
                fontSize: "0.875rem",
              }),
              multiValue: (base) => ({
                ...base,
                background: "#f5faff",
                border: "1px solid #c2e0ff",
                fontSize: "12px",
                margin: "2px 3px 3px 2px",
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
              placeholder: (base) => ({
                ...base,
                fontSize: "0.875rem",
                color: "#9CA3AF",
              }),
              singleValue: (base) => ({
                ...base,
                fontSize: "0.875rem",
              }),
              multiValueLabel: (base) => ({
                ...base,
                fontSize: "0.75rem",
                padding: "2px 6px",
              }),
              multiValueRemove: (base) => ({
                ...base,
                borderLeft: "1px solid #c2e0ff",
              }),
              option: (base, state) => ({
                ...base,
                fontSize: "0.875rem",
                backgroundColor: state.isSelected
                  ? "#f5faff"
                  : state.isFocused
                  ? "#f5faff"
                  : "white",
                color: state.isSelected
                  ? "#333"
                  : state.isDisabled
                  ? "GrayText"
                  : "black",
                fontWeight: state.isSelected ? "600" : "initial",
              }),
            }}
            menuPortalTarget={
              typeof window !== "undefined" ? document.body : undefined
            }
          />
        )}
      />
      {error && <p className='text-red-500 text-sm mt-1 errorMsg'>{error}</p>}
    </div>
  );
};

export default ReactCustomSelect;
