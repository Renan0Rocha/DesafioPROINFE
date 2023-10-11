'use client'

// react
import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Switch,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
// mui
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
//
import isEqual from 'lodash/isEqual'
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
import { ConfirmDialog } from 'src/components/custom-dialog'
import Iconify from 'src/components/iconify'
import Scrollbar from 'src/components/scrollbar'
import { useSettingsContext } from 'src/components/settings'
import { useSnackbar } from 'src/components/snackbar'
import { TableEmptyRows, TableNoData } from 'src/components/table'
// hooks
import { useBoolean } from 'src/hooks/use-boolean'
import { RouterLink } from 'src/routes/components'
import { useRouter } from 'src/routes/hooks'
import { paths } from 'src/routes/paths'
import { FuncionarioService } from 'src/services'
// routes
import * as Mask from 'src/utils/mask'

// ----------------------------------------------------------------------

export default function FuncionarioListView() {
  const settings = useSettingsContext()
  const theme = useTheme()
  const router = useRouter()
  const confirm = useBoolean()
  const { enqueueSnackbar } = useSnackbar()



  const [dataTable, setDataTable] = useState([])
  const [dense, setDense] = useState(true)

  const [pageApi, setPageApi] = useState(1)
  const [quantPagsApi, setQuantPagsApi] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [totalItemsApi, setTotalItemsApi] = useState(0)
  const [searchBarApi, setSearchBarApi] = useState('')

  const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25]

  const PRIMARY_MAIN = theme.palette.primary.main

  const denseHeight = dense ? 52 : 72

  const canReset = !isEqual('', '')

  const notFound = (!dataTable?.length && canReset) || !dataTable?.length

  const emptyRows = () => {
    if (totalItemsApi <= itemsPerPage) {
      return 0
    }

    const rowCount = Math.max(totalItemsApi, 0)
    return (
      itemsPerPage -
      Math.min(itemsPerPage, rowCount - (pageApi - 1) * itemsPerPage)
    )
  }

  const handleDense = (event) => {
    setDense(event.target.checked)
  }

  const handleSearchBarApi = (event) => {
    setSearchBarApi(event.target.value)
  }

  const ClearSerchBar = () => {
    setSearchBarApi('')
  }

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value)
  }

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = dataTable.filter((row) => row.codigo !== id)
      setDataTable(deleteRow)
    },
    [dataTable?.length, dataTable]
  )

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.funcionario.edit(id))
    },
    [router]
  )

  const handleViewerRow = useCallback(
    (id) => {
      router.push(paths.dashboard.funcionario.viewer(id))
    },
    [router]
  )

  const fetchData = async () => {
    FuncionarioService.index()
      .then((response) => {
        setDataTable(response.data)
        setQuantPagsApi(response.meta.totalPages)
        setTotalItemsApi(response.meta.totalItems)
      })
      .catch(() => {
        enqueueSnackbar('Serviço de Funcionário indisponível', {
          variant: 'error',
        })
      })
  }

  useEffect(() => {
    setPageApi(1)
    fetchData()
  }, [itemsPerPage, searchBarApi])

  useEffect(() => {
    fetchData()
  }, [pageApi])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Listagem Funcionários"
        links={[
          {
            name: '',
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.funcionario.new}
            variant="contained"
            sx={{ backgroundColor: PRIMARY_MAIN }}
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Novo cadastro
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card>
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
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            flexGrow={1}
            sx={{ width: 1 }}
          >
            <TextField
              fullWidth
              placeholder="Pesquise..."
              value={searchBarApi}
              onChange={handleSearchBarApi}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: 'text.disabled' }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
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

            <Stack
              flexGrow={1}
              spacing={1}
              direction="row"
              flexWrap="wrap"
              alignItems="center"
            >
              <Button
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={ClearSerchBar}
              >
                Limpar
              </Button>
            </Stack>
          </Stack>
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 650 }} size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '25px' }}>#</TableCell>
                  <TableCell align="left" style={{ width: '180px' }}>
                    Nome
                  </TableCell>
                  <TableCell align="left" style={{ width: '150px' }}>
                    Data de Nascimento
                  </TableCell>
                  <TableCell align="left" style={{ width: '150px' }}>
                    CPF
                  </TableCell>
                  <TableCell align="left" style={{ width: '80px' }}>
                    Sexo
                  </TableCell>
                  <TableCell align="left" style={{ width: '88px' }}>
                    Cidade
                  </TableCell>
                  <TableCell align="left" style={{ width: '100px' }}>
                    Estado
                  </TableCell>
                  <TableCell align="left" style={{ width: '100px' }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ width: '50px' }}>
                    Telefone
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {dataTable?.map((row, index) => (
                  <TableRow hover>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {(pageApi - 1) * itemsPerPage + index + 1}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nome' }}>
                      {row.nome}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'dataNascimento' }}>
                      {row.dataNascimento}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {Mask.cpf(row.cpf)}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {row.endereco.cidade}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {row.endereco?.estado}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {row.email}
                    </TableCell>

                    <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
                      {row.telefone}
                    </TableCell>
                  </TableRow>
                ))}

                <ConfirmDialog
                  open={confirm.value}
                  onClose={confirm.onFalse}
                  title="Deletar"
                  content="Você tem certeza que deseja deletar?"
                  action={
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDeleteRow}
                    >
                      Sim, deletar
                    </Button>
                  }
                />

                <TableEmptyRows height={denseHeight} emptyRows={emptyRows()} />
                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

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
            control={
              <Switch color="primary" checked={dense} onChange={handleDense} />
            }
            label="Comprimir tabela"
            labelPlacement="Comprimir tabela"
          />

          <Pagination
            count={quantPagsApi}
            onChange={(e, value) => setPageApi(value)}
          />

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
      </Card>
    </Container>
  )
}
