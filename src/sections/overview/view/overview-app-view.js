'use client'

// mui
import { Padding } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
// components
import { useSettingsContext } from 'src/components/settings'

// ----------------------------------------------------------------------

export default function OverViewAppView() {
  const theme = useTheme()

  const settings = useSettingsContext()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ width: '100%', maxWidth: 600, textAlign: 'center' }}
        >
         TELA INICAL
        </Typography>
      </Stack>
    </Container>
  )
}
