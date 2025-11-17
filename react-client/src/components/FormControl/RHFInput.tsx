import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { TAny } from "../../schemas/common.schema";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  type?: "text" | "password" | "email" | "number" | "textarea";
  rows?: number;
}

interface RHFInputProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: TAny;
}

const RHFInput = <T extends FieldValues>({
  name,
  control,
  defaultValue = "",
  label,
  containerClassName = "",
  inputClassName = "",
  type = "text",
  rows = 3,
  ...props
}: RHFInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <div className={`flex flex-col gap-1 ${containerClassName}`}>
          {label && (
            <label
              htmlFor={props.id || name}
              className='text-sm font-medium text-gray-700'
            >
              {label}
            </label>
          )}

          {type === "textarea" ? (
            <textarea
              id={props.id || name}
              {...(field as TAny)}
              rows={rows}
              className={`p-2 border rounded-md outline-none focus:ring-2 ${
                fieldState.error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500/80 focus:bg-[#66afe9]/10"
              } ${props.disabled ? "bg-[#eee]" : ""} ${inputClassName}`}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              id={props.id || name}
              type={type}
              {...field}
              className={`p-2 border text-[13px] rounded-sm outline-none focus:ring-1 ${
                fieldState.error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:bg-[#66afe9]/10"
              } ${props.disabled ? "bg-[#eee]" : ""} ${inputClassName}`}
              {...props}
            />
          )}

          {fieldState.error && (
            <p className='text-red-500 text-xs errorMsg'>
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFInput;
