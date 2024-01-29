import React from 'react'
import { Controller as RHFController, Control } from 'react-hook-form'

type ControllerProps = {
  control: Control<any>
  name: string
  placeholder?: string
  label: string
  isError?: boolean
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Controller: React.FC<ControllerProps> = ({
  control,
  name,
  label,
  placeholder,
  isError,
  error,
  ...rest
}) => (
  <RHFController
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value } }) => (
      <div>
        <label className="text-black text-[16px]">{label}</label>
        <input
          className={`w-full px-4 py-3 rounded-lg border ${
            isError ? 'border-[#F56565]' : 'border-[#E2E8F0]'
          } focus:outline-none focus:border-[#4F46E5] text-[16px]`}
          onChange={onChange}
          onBlur={onBlur}
          value={value || ''}
          id={name}
          placeholder={placeholder}
          {...rest}
        />
        {isError && <span className="text-[#F56565] text-[12px]">{error}</span>}
      </div>
    )}
  />
)

export default Controller
