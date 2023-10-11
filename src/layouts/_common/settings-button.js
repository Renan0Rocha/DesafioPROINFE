//
import PropTypes from 'prop-types'
// mui
import Badge, { badgeClasses } from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
//
import { m } from 'framer-motion'
// components
import { varHover } from 'src/components/animate'
import Iconify from 'src/components/iconify'
import { useSettingsContext } from 'src/components/settings'

// ----------------------------------------------------------------------

export default function SettingsButton({ sx }) {
  const settings = useSettingsContext()

  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!settings.canReset}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          top: 8,
          right: 8,
        },
        ...sx,
      }}
    >
      <Box
        component={m.div}
        animate={{
          rotate: [0, settings.open ? 0 : 360],
        }}
        transition={{
          duration: 12,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <IconButton
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          aria-label="settings"
          onClick={settings.onToggle}
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Iconify
            icon="solar:settings-bold-duotone"
            width={24}
            color="white"
          />
        </IconButton>
      </Box>
    </Badge>
  )
}

SettingsButton.propTypes = {
  sx: PropTypes.object,
}