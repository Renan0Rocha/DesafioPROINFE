// react
import { useMemo } from 'react'
// mui
import BadgeIcon from '@mui/icons-material/Badge'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import GroupIcon from '@mui/icons-material/Group'
import Groups2Icon from '@mui/icons-material/Groups2'
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook'
import SchoolIcon from '@mui/icons-material/School'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
// react
import { FaSchool } from 'react-icons/fa'
import { GiOpenBook } from 'react-icons/gi'
import { ImBooks } from 'react-icons/im'
import { IoMdAlert } from 'react-icons/io'
import { RiBookletFill } from 'react-icons/ri'
import { SiGoogleclassroom } from 'react-icons/si'
// components
import SvgColor from 'src/components/svg-color'
// routes
import { paths } from 'src/routes/paths'

// ----------------------------------------------------------------------

const ICONS = {
  formulario: <RiBookletFill fontSize={25} />,
}

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: '',
        items: [
          {
            title: 'Funcionario',
            path: paths.dashboard.funcionario.list,
            icon: ICONS.formulario,
          },
         
        ],
       
      },
    ],
    []
  )

  return data
}
