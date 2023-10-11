'use client'

// utils
import { api } from 'src/utils/axios'
import * as Resturcturer from 'src/utils/restructurer-datas'

// ----------------------------------------------------------------------

async function create(values) {
  const response = await api.post(
    `/funcionario`, values
  )

  return response
}

async function index() {
  const response = await api.get(
    `/funcionario`
  )

  return response.data
}

async function show(id = '/funcionario') {
  const response = await api.get(`/${id}`)

  return response.data
}

async function update(currentValeus, updatedValeus) {
  const values = Resturcturer.removeFieldsNotUpdated(
    currentValeus,
    updatedValeus
  )

  return response
}

async function remove(id = '/funcionario') {
  const response = await api.delete(`/funcionario/${id}`)

  return response
}

export const FuncionarioService = {
  create,
  show,
  index,
  update,
  remove,
}
