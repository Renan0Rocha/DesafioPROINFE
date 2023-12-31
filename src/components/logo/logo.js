import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
// @mui
import { useTheme } from '@mui/material/styles'
// routes
import { RouterLink } from 'src/routes/components'

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme()

  const PRIMARY_LIGHT = theme.palette.primary.light

  const PRIMARY_MAIN = theme.palette.primary.main

  const PRIMARY_DARK = theme.palette.primary.dark

  // OR using local (public folder)
  // -------------------------------------------------------

  const logo = (
    <Box
      component="img"
      src="/logo/logo_single.png"
      sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    />
  )

  if (disabledLink) {
    return logo
  }

  return (
    <Link component={RouterLink} href="/dashboard" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  )
})

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
}

export default Logo
