'use client';


import PropTypes from 'prop-types'
// mui
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------


export const LocalFilter = ({ searchBarApi, setSearchBarApi, totalItemsApi }) => {
  const handleSearchBarApi = (event) => {
    setSearchBarApi(event.target.value);
  };

  const ClearSerchBar = () => {
    setSearchBarApi('');
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: 2.5,
          pl: 2.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            placeholder="Pesquise..."
            value={searchBarApi}
            onChange={handleSearchBarApi}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        {searchBarApi && (
          <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
            <Button
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={ClearSerchBar}
            >
              Limpar
            </Button>
          </Stack>
        )}
      </Stack>

      {searchBarApi && (
        <Stack
          spacing={1.5}
          sx={{
            pr: 2.5,
            pl: 2.5,
            pb: 2,
          }}
        >
          <Box sx={{ typography: 'body2' }}>
            <strong> {totalItemsApi} </strong>
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
              resultados encontrados
            </Box>
          </Box>
        </Stack>
      )}
    </>
  );
};

LocalFilter.propTypes = {
  searchBarApi: PropTypes.string,
  setSearchBarApi: PropTypes.any,
  totalItemsApi: PropTypes.number,
}

// ----------------------------------------------------------------------


export const LocalPagination = ({
  dense,
  setDense,
  quantPagsApi,
  pageApi,
  setPageApi,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25];

  const handleDense = (event) => {
    setDense(event.target.checked);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  const handlePageChange = (_, value) => {
    setPageApi(value);
  };

  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '15px',
          fontSize: '0.875rem',
        }}
      >
        <FormControlLabel
          value="comprimir"
          control={<Switch color="primary" checked={dense} onChange={handleDense} />}
          label="Comprimir tabela"
          labelPlacement="start"
        />
        <Pagination count={quantPagsApi} page={pageApi} onChange={handlePageChange} />

        <Box>
          <span> Itens por página: </span>
          <Select
            style={{ marginLeft: '10px', width: '65px', height: '35px' }}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </>
  );
};

LocalPagination.propTypes = {
  dense: PropTypes.bool,
  setDense: PropTypes.any,
  quantPagsApi: PropTypes.number,
  pageApi: PropTypes.number,
  setPageApi: PropTypes.any,
  itemsPerPage: PropTypes.number,
  setItemsPerPage: PropTypes.any,
}
