// react
import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
// mui
import LoadingButton from '@mui/lab/LoadingButton'
import { Alert } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { Controller, useForm } from 'react-hook-form'
// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form'
import Iconify from 'src/components/iconify'
import SvgColor from 'src/components/svg-color'
// routes
import * as Mask from 'src/utils/mask'
import { setSessionItem } from 'src/utils/storage'
// utils
import * as Yup from 'yup'

// ----------------------------------------------------------------------
// ARRUMAR ERRO DE QUANDO VOLTAR PRA FUNCIONÁRIO ANTERIOR, ELE LIMPA TODOS OS DADOS

export default function FormContato({
  currentFuncionario,
  session,
  setFinalizeForm,
  setCurrentTab,
  finalizeForm,
}) {
  const theme = useTheme()

  const PRIMARY_MAIN = theme.palette.primary.main

  const [telefones, setTelefones] = useState([])

  const [emails, setEmails] = useState([])

  function validationSchemaGenerated() {
    let schemaObj = {}

    for (let i = 0; i < telefones.length; i++) {
      schemaObj[`telefone${i}`] = Yup.string()
        .required('Telefone é obrigatório')
        .min(15, 'Mínimo 11 caracteres')
      schemaObj[`tipo${i}`] = Yup.string().required('Tipo é obrigatório')
    }

    for (let i = 0; i < emails.length; i++) {
      schemaObj[`email${i}`] = Yup.string()
        .required('Email é obrigatório')
        .email('Email inválido')
    }

    return Yup.object().shape(schemaObj)
  }

  const validationSchema = validationSchemaGenerated()

  const methods = useForm({
    resolver: yupResolver(validationSchema),
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
        session('contato', dividirObjeto(data)) 
        console.log(session)
        setFinalizeForm(true)
      } catch (error) {
        console.error(error)
      }
    },
    [telefones, emails]
  )

  const adicionarTelefone = () => {
    setTelefones([...telefones, { numero: '', tipo: '' }])
  }

  const removerTelefone = () => {
    setValue(`telefone${telefones.length - 1}`, '')
    const telefonesCopy = [...telefones]
    telefonesCopy.pop()
    setTelefones(telefonesCopy)
  }

  const adicionarEmail = () => {
    setEmails([...emails, { email: '' }])
  }

  const removerEmail = () => {
    setValue(`email${emails.length - 1}`, '')
    const emailsCopy = [...emails]
    emailsCopy.pop()
    setEmails(emailsCopy)
  }

  const dividirObjeto = (data) => {
    let contatos = {
      contato: {
        telefones: [],
        emails: [],
      },
    }

    for (let i = 0; i <= emails.length; i++) {
      const email = data[`email${i}`]

      if (email)
        contatos.contato.emails.push(
          i === 0
            ? { email: email, principal: true }
            : { email: email, principal: false }
        )
    }

    for (let i = 0; i <= telefones.length; i++) {
      const telefone = data[`telefone${i}`]
      const tipo = data[`tipo${i}`]

      if (telefone && tipo)
        contatos.contato.telefones.push(
          i === 0
            ? { numero: telefone, tipo, principal: true }
            : { numero: telefone, tipo, principal: false }
        )
    }
    return contatos
  }

  useEffect(() => {
    if (currentFuncionario) {
      setTelefones(currentFuncionario.contato.telefones)
      setEmails(currentFuncionario.contato.emails)
    } else {
      setEmails([{ email: '' }])
      setTelefones([{ numero: '', tipo: '' }])
    }
  }, [])

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
              <Alert variant="outlined" severity="info">
                O primeiro campo de telefone e e-mail é considerado como o
                principal meio de contato.
              </Alert>

              <Typography variant="h6">Telefones</Typography>

              {telefones.map((item, index) => (
                <Grid container spacing={3} key={index}>
                  <Grid xs={5} sm={6}>
                    <Controller
                      name={`telefone${index}`}
                      control={control}
                      defaultValue={item.numero}
                      render={({ field }) => (
                        <RHFTextField
                          {...field}
                          label="Telefone"
                          placeholder="(69) 99357-5325"
                          onChange={(e) => {
                            field.onChange(Mask.telefone(e.target.value))
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={4} sm={6}>
                    <Controller
                      name={`tipo${index}`}
                      control={control}
                      defaultValue={item.tipo}
                      render={({ field }) => (
                        <RHFSelect {...field} fullWidth label="Tipo">
                          <MenuItem value="Casa">Casa</MenuItem>
                          <MenuItem value="Trabalho">Trabalho</MenuItem>
                          <MenuItem value="Celular">Celular</MenuItem>
                        </RHFSelect>
                      )}
                    />
                  </Grid>
                </Grid>
              ))}

              <Stack
                direction="row"
                justifyContent="flex-start"
                spacing={2}
                sx={{ mt: -2 }}
              >
                <Button
                  variant="text"
                  sx={{ color: PRIMARY_MAIN }}
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={adicionarTelefone}
                >
                  Adicionar contato
                </Button>
                {telefones.length > 1 && (
                  <Button
                    variant="text"
                    sx={{ color: '#fe5137' }}
                    startIcon={<Iconify icon="mingcute:minimize-line" />}
                    onClick={removerTelefone}
                  >
                    Remover contato
                  </Button>
                )}
              </Stack>

              <Typography variant="h6">E-mails</Typography>

              {emails.map((email, index) => (
                <Grid container spacing={3} key={index}>
                  <Grid xs={9} sm={12}>
                    <Controller
                      name={`email${index}`}
                      control={control}
                      defaultValue={email.email}
                      render={({ field }) => (
                        <RHFTextField
                          {...field}
                          label="E-mail"
                          placeholder="escola@gmail.com"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              ))}

              <Stack
                direction="row"
                justifyContent="flex-start"
                spacing={2}
                sx={{ mt: -2 }}
              >
                <Button
                  variant="text"
                  sx={{ color: PRIMARY_MAIN }}
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={adicionarEmail}
                >
                  Adicionar e-mail
                </Button>
                {emails.length > 1 && (
                  <Button
                    variant="text"
                    sx={{ color: '#fe5137' }}
                    startIcon={<Iconify icon="mingcute:minimize-line" />}
                    onClick={removerEmail}
                  >
                    Remover e-mail
                  </Button>
                )}
              </Stack>
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
                  session('contato',dividirObjeto(values))
                  setCurrentTab('endereco')
                }}
              >
                Voltar
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={finalizeForm}
                sx={{ backgroundColor: PRIMARY_MAIN }}
              >
                Salvar
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}

FormContato.propTypes = {
  currentFuncionario: PropTypes.object,
  session: PropTypes.func,
  setCurrentTab: PropTypes.elementType,
  setFinalizeForm: PropTypes.any,
  finalizeForm: PropTypes.any,
}
