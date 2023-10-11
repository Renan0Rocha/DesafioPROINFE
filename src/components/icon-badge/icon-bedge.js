// icons
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
// @mui
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function IconBedge({
  children,
  color = 'white',
  backgroundColor,
  ...other
}) {
  const theme = useTheme()

  const PRIMARY_MAIN = theme.palette.primary.main

  return (
    <div
      style={{
        marginRight: '0.5rem',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: backgroundColor ? backgroundColor : PRIMARY_MAIN,
      }}
    >
      <span
        style={{
          color: color,
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {children}
      </span>
    </div>
  )
}

IconBedge.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  children: PropTypes.any,
}
