// react
import { useCallback, useMemo } from 'react'
//
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
// mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'
// react
import { useForm } from 'react-hook-form'
// components
import FormProvider, {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form'
import SvgColor from 'src/components/svg-color'
// utils
import { fDate } from 'src/utils/format-time'
import { mask } from 'src/utils/mask'
//
import * as Yup from 'yup'
import { cnpj as CNPJ } from "cpf-cnpj-validator";

// ----------------------------------------------------------------------
export default function FormIdentificacao({
  currentFuncionario,
  session,
  setCurrentTab,
}) {
  const theme = useTheme()

  const PRIMARY_MAIN = theme.palette.primary.main

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório').min(5, 'Minímo de 5 caracteres').test('no-special-characters-or-numbers', 'Prefeito não pode conter caracteres especiais ou números', (value) => {
      return /^[a-zA-Z\s]*$/.test(value);
    }),
    dataNascimento: Yup.string().required('Data de Nascimento é obrigatório'),
    cpf: Yup.string().required('Razão Social é obrigatório'),
    sexo: Yup.string().required('Sexo é obrigatório'),
  })

  const defaultValues = useMemo(
    () => ({
      nome: currentFuncionario?.nome || '',
      dataNascimento: currentFuncionario?.dataNascimento || '',
      cpf: currentFuncionario?.cpf || '',
      sexo: currentFuncionario?.sexo || '',
    }),
    [currentFuncionario]
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  const onSubmit = useCallback(
    async (data) => {
      try {
        data.dataNascimento = fDate(data.dataNascimento)
        session('identificacao', data)
        setCurrentTab('endereco')
      } catch (error) {
        console.error(error)
      }
    },
    [currentFuncionario]
  )

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="nome"
                label="Nome"
                placeholder="Fulano da Silva"
                
              />

              <RHFDatePicker name="dataNascimento" label="Data de Nascimento" />

              <RHFTextField
                name="cpf"
                label="CPF"
                placeholder="000.000.000-00"
                mask="cpf"
              />

              <RHFSelect  
              name="sexo"
              label="Sexo"
              placeholder="Masculino">
                <MenuItem value={"Masculino"}>Masculino</MenuItem>
                <MenuItem value={"Feminino"}>Feminino</MenuItem>
              </RHFSelect>
        
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: PRIMARY_MAIN }}
              >
                Avançar
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}

FormIdentificacao.propTypes = {
  currentFuncionario: PropTypes.object,
  session: PropTypes.func,
  setCurrentTab: PropTypes.elementType,
}
