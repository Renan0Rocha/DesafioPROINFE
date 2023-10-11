// @mui
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
// auth
import { useAuthContext } from 'src/auth/hooks'
// components
import Logo from 'src/components/logo'
// hooks
import { useResponsive } from 'src/hooks/use-responsive'
import { RouterLink } from 'src/routes/components'
// routes
import { paths } from 'src/routes/paths'
// theme
import { bgGradient } from 'src/theme/css'

// ----------------------------------------------------------------------

const METHODS = [
  {
    id: 'jwt',
    label: 'Jwt',
    path: paths.auth.login,
    icon: '/assets/icons/auth/ic_jwt.svg',
  },
]

export default function AuthClassicLayout({
  children,
  image,
  title,
  register,
}) {
  const { method } = useAuthContext()

  const theme = useTheme()

  const upMd = useResponsive('up', 'md')

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  )

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
      }}
    >
      {children}
    </Stack>
  )

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      spacing={10}
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Typography
        variant="h3"
        sx={{ maxWidth: 480, textAlign: 'center', color: '#318bba' }}
      >
        {title || 'PROINFE'}
      </Typography>

      <Box
        component="img"
        alt="auth"
        src={
          image ||
          `/assets/illustrations/illustration_${
            register ? 'register' : 'login'
          }.png`
        }
        sx={{ maxWidth: register ? 600 : 500, pointerEvents:'none',  }}
      />

      <Stack direction="row" spacing={2}>
        {METHODS.map((option) => (
          <Tooltip key={option.label} title={option.label}>
            <Link component={RouterLink} href={option.path}>
              <Box
                alt={option.label}
                sx={{
                  width: 32,
                  height: 32,
                  ...(method !== option.id && {
                    filter: 'grayscale(100%)',
                  }),
                }}
              />
            </Link>
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  )

  return (
    <Stack
      component="main"
      direction={`row${register && '-reverse'}`}
      sx={{
        minHeight: '100vh',
      }}
    >
      {renderLogo}

      {upMd && renderSection}

      {renderContent}
    </Stack>
  )
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
}
