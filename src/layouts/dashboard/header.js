//
import PropTypes from 'prop-types'
// mui
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
// components
import Logo from 'src/components/logo'
import { useSettingsContext } from 'src/components/settings'
import SvgColor from 'src/components/svg-color'
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top'
import { useResponsive } from 'src/hooks/use-responsive'
// theme
import { bgBlur } from 'src/theme/css'

//
import {
  AccountPopover,
  NotificationsPopover,
  Searchbar,
  SettingsButton,
} from '../_common'
//
import { HEADER, NAV } from '../config-layout'

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme()

  const settings = useSettingsContext()

  const isNavHorizontal = settings.themeLayout === 'horizontal'

  const isNavMini = settings.themeLayout === 'mini'

  const lgUp = useResponsive('up', 'lg')

  const offset = useOffSetTop(HEADER.H_DESKTOP)

  const offsetTop = offset && !isNavHorizontal

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav} color="white">
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" color="white"/>
        </IconButton>
      )}


      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >


        <AccountPopover />
      </Stack>
    </>
  )

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: '#078dee',
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: '#078dee',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
}
