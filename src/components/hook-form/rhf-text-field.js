// @mui
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
// utils
import * as Mask from 'src/utils/mask'

// ----------------------------------------------------------------------

export default function RHFTextField({
  mask = '',
  name,
  helperText,
  type,
  upperCase,
  lowercase,
  ...other
}) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={
            type === 'number' && field.value === 0
              ? ''
              : mask
              ? Mask?.[mask]?.(field.value)
              : field.value
          }
          onChange={(event) => {
            let text = event.target.value

            if(upperCase) text =  event.target.value.toUpperCase()
            if(lowercase) text =   event.target.value.toLowerCase()
           

            if (type === 'number') {
              field.onChange(Number(text))
            } else {
              field.onChange(
                mask ? Mask?.[mask]?.(text) : text
              )
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}

RHFTextField.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  mask: PropTypes.string,
}
