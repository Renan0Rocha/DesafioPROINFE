// react
import { useCallback, useEffect, useMemo, useState } from 'react'
//
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
// mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'
// react
import { useForm } from 'react-hook-form'
// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form'
import { useSnackbar } from 'src/components/snackbar'
import SvgColor from 'src/components/svg-color'
// services
import { BaseServices } from 'src/services'
import { ProcessingErros } from 'src/utils/extract-errors'
// utils
import * as Mask from 'src/utils/mask'
import { setSessionItem } from 'src/utils/storage'
//
import * as Yup from 'yup'

// ----------------------------------------------------------------------
export default function FormEndereco({
  currentFuncionario,
  session,
  setCurrentTab,
}) {
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const PRIMARY_MAIN = theme.palette.primary.main

  const [errorCep, setErrorCep] = useState(false)

  const [listaEstados, setListaEstados] = useState([])
  const [listaCidades, setListaCidades] = useState([])

  const validationSchema = Yup.object().shape({
    endereco: Yup.object().shape({
      cep: Yup.string().required('CEP é obrigatório'),
      cidade: Yup.string().required('Cidade é obrigatório'),
      logradouro: Yup.string().required('Logradouro é obrigatório'),
      bairro: Yup.string().required('Bairro é obrigatório'),
      numero: Yup.string()
        .matches(/^[0-9]*$/, 'Apenas números são permitidos')
        .required('Número é obrigatório'),
      
    }),
  })

  const defaultValues = useMemo(
    () => ({
      endereco: {
        cep: currentFuncionario?.endereco?.cep || '',
        cidade: currentFuncionario?.endereco?.cidade || '',
        estado: currentFuncionario?.endereco?.estado || '',
        logradouro: currentFuncionario?.endereco?.logradouro || '',
        bairro: currentFuncionario?.endereco?.bairro || '',
        numero: currentFuncionario?.endereco?.numero || '',
      },
    }),
    [currentFuncionario]
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  const onSubmit = useCallback(
    async (data) => {
      try {
        data.endereco.numero = parseInt(data.endereco.numero)
        data.endereco.cidade = parseInt(data.endereco.cidade)

        session('endereco', data)
        setCurrentTab('contato')
      } catch (error) {
        enqueueSnackbar('Erro ao salvar dados', {
          variant: 'error',
        })
      }
    },
    [currentFuncionario]
  )

  /*useEffect(() => {
    BaseServices.ShowEstados()
      .then((response) => {
        setListaEstados(response)
      })
      .catch(() => {
        enqueueSnackbar('Serviço de estados indisponível', {
          variant: 'error',
        })
      })
  }, [])

  useEffect(() => {
    if (values.endereco.cidade.estado.uf) {
      BaseServices.ShowCidades(values.endereco.cidade.estado.uf)
        .then((response) => {
          setListaCidades(response)
        })
        .catch((error) => {
          enqueueSnackbar('Serviço de cidade indisponível', {
            variant: 'error',
          })
        })
    }
  }, [values.endereco.cidade.estado.uf])

  useEffect(() => {
    if (
      Mask.unmasked(values.endereco.cep).length == 8 &&
      currentFuncionario?.endereco?.cep != values.endereco.cep
    ) {
      BaseServices.IndexCep(Mask.unmasked(values.endereco.cep))
        .then((response) => {
          setErrorCep(false)
          setValue('endereco.cidade.estado.uf', response.info.uf)
          setValue('endereco.cidade.id', response.info.ibge)
          setValue('endereco.logradouro', response.info.logradouro)
          setValue('endereco.bairro', response.info.bairro)
        })
        .catch((error) => {
          enqueueSnackbar(ProcessingErros(error, 'CEP não encontrado')?.[0], {
            variant: 'error',
          })

          setErrorCep(true)

          setValue('endereco.cidade.estado.uf', '')
          setValue('endereco.cidade.id', '')
          setValue('endereco.logradouro', '')
          setValue('endereco.bairro', '')
        })
    }
  }, [values.endereco.cep])*/

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={'repeat(1, 1fr)'}
            >
              <Stack spacing={3} direction={{ xs: 'column', sm: 'row' }}>
                <RHFTextField
                  name="endereco.cep"
                  label="CEP"
                  placeholder="76909-836"
                  mask="cep"
                />

                <RHFTextField
                  fullWidth
                  name="endereco.estado"
                  label="Estado"
                >
                </RHFTextField>

                <RHFTextField
                  fullWidth
                  name="endereco.cidade"
                  label="Cidade"
                >
                </RHFTextField>
              </Stack>

              <Grid container spacing={3}>
                <Grid xs={12} sm={5}>
                  <RHFTextField
                    name="endereco.bairro"
                    label="Bairro"
                    placeholder="Colina Park"
                  />
                </Grid>
                <Grid xs={12} sm={5}>
                  <RHFTextField
                    name="endereco.logradouro"
                    label="Logradouro"
                    placeholder="Rua Dra Telma Rios"
                  />
                </Grid>
                <Grid xs={12} sm={2}>
                  <RHFTextField
                    name="endereco.numero"
                    label="Número"
                    placeholder="1174"
                  />
                </Grid>
              </Grid>

            </Box>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button
                variant="outlined"
                sx={{ color: PRIMARY_MAIN }}
                onClick={() => {
                  session('endereco',values) 
                  setCurrentTab('identificacao')
                }}
              >
                Voltar
              </Button>
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

FormEndereco.propTypes = {
  currentFuncionario: PropTypes.object,
  session: PropTypes.func,
  setCurrentTab: PropTypes.elementType,
}
