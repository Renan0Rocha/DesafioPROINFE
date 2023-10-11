'use client'

// mui
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
//
import { m } from 'framer-motion'
// assets
import { SeverErrorIllustration } from 'src/assets/illustrations'
// components
import { MotionContainer, varBounce } from 'src/components/animate'
// layouts
import CompactLayout from 'src/layouts/compact'
// routes
import { RouterLink } from 'src/routes/components'

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            500 Erro do Servidor Interno
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
          Houve um erro, por favor tente novamente mais tarde.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button
          component={RouterLink}
          href="/dashboard"
          size="large"
          variant="contained"
        >
         Vá para Casa
        </Button>
      </MotionContainer>
    </CompactLayout>
  )
}
