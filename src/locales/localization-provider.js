'use client';

import PropTypes from 'prop-types';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';
//
import useLocales from './use-locales';

// ----------------------------------------------------------------------

export default function LocalizationProvider({ children }) {
  const { currentLang } = useLocales();

  return (
    <MuiLocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      {children}
    </MuiLocalizationProvider>
  );
}

LocalizationProvider.propTypes = {
  children: PropTypes.node,
};
