'use client'

// react
import { useCallback, useEffect, useMemo, useState } from 'react'
//
import { yupResolver } from '@hookform/resolvers/yup'
// mui
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
// react
import { useForm } from 'react-hook-form'
// auth
import { useAuthContext } from 'src/auth/hooks'
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import Iconify from 'src/components/iconify'
import SvgColor from 'src/components/svg-color'
// config
import { PATH_AFTER_LOGIN } from 'src/config-global'
// hooks
import { useBoolean } from 'src/hooks/use-boolean'
import { RouterLink } from 'src/routes/components'
// routes
import { useRouter, useSearchParams } from 'src/routes/hooks'
import { paths } from 'src/routes/paths'
//
import * as Yup from 'yup'
import { cpf as CPF } from "cpf-cnpj-validator";

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext()
  const theme = useTheme()
  const router = useRouter()
  const PRIMARY_MAIN = theme.palette.primary.main

  const [errorMsg, setErrorMsg] = useState('')

  const searchParams = useSearchParams()

  const returnTo = searchParams.get('returnTo')

  const password = useBoolean()

  const LoginSchema = Yup.object().shape({
    cpf: Yup.string(),
    password: Yup.string()
  })

  const defaultValues = useMemo(
    () => ({
      cpf: '481.364.130-02',
      password: '12345678', 
    }),
    []
  )

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  })

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  const onSubmit = useCallback(
    async (data) => {
      try {
        await login?.(data.cpf, data.password)

        //window.location.href = returnTo || PATH_AFTER_LOGIN
      } catch (error) {
        if(error?.response?.status == 400)
          setErrorMsg('CPF ou senha incorreta')
        else
          setErrorMsg(typeof error === 'string' ? error : error.message)
      }
    },
    [login, reset, returnTo]
  )

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Faça login para continuar</Typography>
    </Stack>
  )

  const renderForm = (
    <Stack spacing={2.5}>
     
      <LoadingButton
        fullWidth
        sx={{ backgroundColor: '#318bba' }}
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        ENTRAR
      </LoadingButton>
     
    </Stack>
  )

  const passarLogin = async () => {
    try {
      await login?.('05814521279', '1234')

      //window.location.href = returnTo || PATH_AFTER_LOGIN
    } catch (error) {
      if(error?.response?.status == 400)
        setErrorMsg('CPF ou senha incorreta')
      else
        setErrorMsg(typeof error === 'string' ? error : error.message)
    }
  }

 /*  useEffect(() => {
    passarLogin()
  },[])*/

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
 
      {/* 
      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>
      */}

      {renderForm}
    </FormProvider>
  )
}
