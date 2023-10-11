//
import { customShadows } from '../custom-shadows'
import { palette } from '../palette'

// ----------------------------------------------------------------------

export function contrast(contrastBold, mode) {
  const theme = {
    ...(contrastBold &&
      mode === 'light' && {
        palette: {
          background: {
            default: palette(mode).grey[100],
          },
        },
      }),
  }

  const components = {
    ...(contrastBold && {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: customShadows(mode).z4,
          },
        },
      },
    }),
  }

  return {
    theme,
    components,
  }
}
