// react
import { forwardRef } from 'react'
// next
import Link from 'next/link'

// ----------------------------------------------------------------------

const RouterLink = forwardRef(({ ...other }, ref) => (
  <Link ref={ref} {...other} />
))

export default RouterLink
