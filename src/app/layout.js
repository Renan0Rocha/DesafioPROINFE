// i18n
import 'src/locales/i18n'
// scrollbar
import 'simplebar-react/dist/simplebar.min.css'
// lightbox
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
// map
import 'mapbox-gl/dist/mapbox-gl.css'
// editor
import 'react-quill/dist/quill.snow.css'
import 'src/theme/css.css'
// carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// image
import 'react-lazy-load-image-component/src/effects/blur.css'

// ----------------------------------------------------------------------

import PropTypes from 'prop-types'
// auth
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt'
import { MotionLazy } from 'src/components/animate/motion-lazy'
// components
import ProgressBar from 'src/components/progress-bar'
import { SettingsDrawer, SettingsProvider } from 'src/components/settings'
import SnackbarProvider from 'src/components/snackbar/snackbar-provider'
// locales
import { LocalizationProvider } from 'src/locales'
// theme
import ThemeProvider from 'src/theme'
import { primaryFont } from 'src/theme/typography'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'DESAFIO',
  description: 'Desafio PROINFE',
  keywords: 'escola,ifro,gestão',
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'dark', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'bold', // 'default' | 'bold'
                themeLayout: 'horizontal', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'cyan', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: true,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <SettingsDrawer />
                    <ProgressBar />
                    <AuthConsumer>{children}</AuthConsumer>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node,
}
