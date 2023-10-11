'use client'

// mui
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
//
import { m } from 'framer-motion'
// assets
import { PageNotFoundIllustration } from 'src/assets/illustrations'
// components
import { MotionContainer, varBounce } from 'src/components/animate'
// layouts
import CompactLayout from 'src/layouts/compact'
// routes
import { RouterLink } from 'src/routes/components'

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
          Desculpe, página não encontrada!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
          Lamentamos, mas não conseguimos encontrar a página que procura. Talvez você tenha
             digitou incorretamente o URL? Certifique-se de verificar sua ortografia.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button
          component={RouterLink}
          href="/dashboard"
          size="large"
          variant="contained"
        >
          Vá para casa
        </Button>
      </MotionContainer>
    </CompactLayout>
  )
}
