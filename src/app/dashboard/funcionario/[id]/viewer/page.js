import PropTypes from 'prop-types'
// _mock
import { _userList } from 'src/_mock/_user'
// sections
import { SecretariaViwerView } from 'src/sections/secretaria/view/'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Desafio Proinfe',
}

export default function UserEditPage({ params }) {
  const { id } = params

  return <SecretariaViwerView id={id} />
}

UserEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
}
