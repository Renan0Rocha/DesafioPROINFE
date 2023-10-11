'use client'

// mui
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
//
import { m } from 'framer-motion'
// assets
import { ForbiddenIllustration } from 'src/assets/illustrations'
// components
import { MotionContainer, varBounce } from 'src/components/animate'
// layouts
import CompactLayout from 'src/layouts/compact'
// routes
import { RouterLink } from 'src/routes/components'

// ----------------------------------------------------------------------

export default function View403() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
          Sem permissão
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
          A página que você está tentando acessar tem acesso restrito.
            <br />
            Consulte o administrador do sistema
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button
          component={RouterLink}
          href="/pinel"
          size="large"
          variant="contained"
        >
       Vá para casa
        </Button>
      </MotionContainer>
    </CompactLayout>
  )
}
