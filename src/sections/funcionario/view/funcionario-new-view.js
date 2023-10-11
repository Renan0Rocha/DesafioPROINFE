'use client'

// mui
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
import { useSettingsContext } from 'src/components/settings'
import SvgColor from 'src/components/svg-color'
// routes
import { RouterLink } from 'src/routes/components'
import { paths } from 'src/routes/paths'

//
import FuncionarioNewEditForm from '../funcionario-new-edit-form'

// ----------------------------------------------------------------------

export default function FuncionarioNewView() {
  const settings = useSettingsContext()
  const theme = useTheme()

  const PRIMARY_MAIN = theme.palette.primary.main

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Cadastro"
        links={[
          {
            name: '',
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.funcionario.list}
            variant="contained"
            sx={{ backgroundColor: PRIMARY_MAIN }}
            startIcon={<SvgColor src={`/assets/icons/book.svg`} />}
          >
            Lista Cadastros
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FuncionarioNewEditForm />
    </Container>
  )
}
