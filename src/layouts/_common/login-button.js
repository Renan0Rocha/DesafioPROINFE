//
import PropTypes from 'prop-types'
// mui
import Button from '@mui/material/Button'
// auth
import { useAuthContext } from 'src/auth/hooks'
// routes
import { RouterLink } from 'src/routes/components'
import { paths } from 'src/routes/paths'

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.login,
}

export default function LoginButton({ sx }) {
  const { method } = useAuthContext()

  const loginPath = loginPaths[method]

  return (
    <Button
      component={RouterLink}
      href={loginPath}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
    >
      Login
    </Button>
  )
}

LoginButton.propTypes = {
  sx: PropTypes.object,
}
