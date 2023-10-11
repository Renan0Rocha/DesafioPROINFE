// mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// components
import Logo from 'src/components/logo'
import { NavSectionMini } from 'src/components/nav-section'
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user'
// theme
import { hideScroll } from 'src/theme/css'

//
import { NavToggleButton } from '../_common'
import { NAV } from '../config-layout'
import { useNavData } from './config-navigation'

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useMockedUser()

  const navData = useNavData()

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Stack>
    </Box>
  )
}
