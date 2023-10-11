// react
import { memo } from 'react'
// mui
import AppBar from '@mui/material/AppBar'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
// components
import { NavSectionHorizontal } from 'src/components/nav-section'
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user'
// theme
import { bgBlur } from 'src/theme/css'

//
import { HeaderShadow } from '../_common'
import { HEADER } from '../config-layout'
import { useNavData } from './config-navigation'

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme()

  const { user } = useMockedUser()

  const navData = useNavData()

  return (
    <AppBar
      component="nav"
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  )
}

export default memo(NavHorizontal)
