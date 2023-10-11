// utils
import { api } from 'src/utils/axios'

// ----------------------------------------------------------------------

async function IndexCep(value) {
  const response = await api.get(`/base/endereco/cep/${value}`)

  return response.data
}

async function ShowPais() {
  const response = await api.get(`/base/pais`)

  return response.data
}

async function ShowEstados(value = '') {
  const response = await api.get(`/base/estados/${value}`)

  return response.data
}

async function ShowCidades(value = '') {
  const response = await api.get(`/base/cidades/${value}`)

  return response.data
}

async function ShowAreaConhecimento() {
  const response = await api.get(`/pessoa/area-conhecimento`)

  return response.data
}

async function ShowOpcoes() {
  const response = await api.get('/base/endereco/opcoes')

  return response.data
}

export const BaseServices = {
  IndexCep,
  ShowEstados,
  ShowCidades,
  ShowOpcoes,
  ShowPais,
  ShowAreaConhecimento,
}
