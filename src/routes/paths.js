// mock
// import { _id, _postTitles } from 'src/_mock/assets'
// utils
import { paramCase } from 'src/utils/change-case'

// ----------------------------------------------------------------------

// const MOCK_ID = _id[1]
//
// const MOCK_TITLE = _postTitles[2]

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
}

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  figma:
    'https://www.figma.com/file/kAYnYYdib0aQPNKZpgJT6J/%5BPreview%5D-Minimal-Web.v5.0.0?type=design&node-id=0%3A1&t=Al4jScQq97Aly0Mn-1',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    funcionario: {
      list: `${ROOTS.DASHBOARD}/funcionario`,
      new: `${ROOTS.DASHBOARD}/funcionario/new`,
      //edit: (id) => `${ROOTS.DASHBOARD}/funcionario/${id}/edit`,
      //viewer: (id) => `${ROOTS.DASHBOARD}/funcionario/${id}/viewer`,
    },
  },
}
