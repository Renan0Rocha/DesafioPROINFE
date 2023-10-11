// mui
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
//
import { m } from 'framer-motion'
// auth
import { useAuthContext } from 'src/auth/hooks'
// components
import { varHover } from 'src/components/animate'
import CustomPopover, { usePopover } from 'src/components/custom-popover'
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user'
// routes
import { useRouter } from 'src/routes/hooks'
import { paths } from 'src/routes/paths'

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Página inicial',
    linkTo: '/',
  },
  {
    label: 'Perfil',
    linkTo: '/#1',
  },
  {
    label: 'Configurações',
    linkTo: '/#2',
  },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter()

  const { user } = useMockedUser()

  const { logout } = useAuthContext()

  const popover = usePopover()

  const handleLogout = async () => {
    try {
      await logout()
      popover.onClose()
      router.replace(paths.auth.login)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickItem = (path) => {
    popover.onClose()
    router.push(path)
  }

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

    
    </>
  )
}
