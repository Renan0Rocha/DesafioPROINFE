// @mui
import PropTypes from 'prop-types'
import { DatePicker } from '@mui/x-date-pickers'
import { Controller, useFormContext } from 'react-hook-form'
import { fDate } from 'src/utils/format-time'

// ----------------------------------------------------------------------

export default function RHFDatePicker({
  name,
  label = 'Data',
  placeholder = '29/08/2004',
  ...other
}) {
  const { control } = useFormContext()

  const formatDate = (date) => {
    if(date.length === 10) return  new Date(`${date}T00:00:00`)

    return  new Date(date);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isDateValid = field.value && !isNaN(Date.parse(field.value))
        return (
          <DatePicker
            format="dd/MM/yyyy"
            label={label}
            placeholder={placeholder}
            value={isDateValid ? formatDate(field.value) : null}
            onChange={(newValue) => {
              field.onChange(newValue)
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
            {...other}
          />
        )
      }}
    />
  )
}

RHFDatePicker.propTypes = {
  name: PropTypes.string,
}
