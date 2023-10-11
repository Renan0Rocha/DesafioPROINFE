
export const unmasked = (value = '') => {
  return value?.replace(/[^a-zA-Z0-9]/g, '')
}

export const cpf = (value = '') => {
  const maxLength = 11

  let numericValue = value.replace(/\D/g, '')

  if (numericValue.length > maxLength) {
    numericValue = numericValue.slice(0, maxLength)
  }

  let maskedValue = ''

  if (numericValue.length > 3) {
    maskedValue = `${numericValue.substring(0, 3)}.${numericValue.substring(3)}`

    if (numericValue.length > 6) {
      maskedValue = `${maskedValue.substring(0, 7)}.${maskedValue.substring(7)}`

      if (numericValue.length > 9) {
        maskedValue = `${maskedValue.substring(0, 11)}-${maskedValue.substring(
          11
        )}`
      }
    }
  } else {
    maskedValue = numericValue
  }

  return maskedValue
}

export const telefone = (value = '') => {
  const maxLength = 11

  let numericValue = value.replace(/\D/g, '')

  if (numericValue.length > maxLength) {
    numericValue = numericValue.slice(0, maxLength)
  }

  let maskedValue = ''

  if (numericValue.length >= 1) {
    maskedValue = `(${numericValue.substring(0)}`

    if (numericValue.length > 2) {
      maskedValue = `${maskedValue.substring(0, 3)}) ${maskedValue.substring(
        3
      )}`

      if (numericValue.length > 7) {
        maskedValue = `${maskedValue.substring(0, 10)}-${maskedValue.substring(
          10
        )}`
      }
    }
  }

  return maskedValue
}

export const cep = (value = '') => {
  const maxLength = 8

  let numericValue = value.replace(/\D/g, '')

  if (numericValue.length > maxLength) {
    numericValue = numericValue.slice(0, maxLength)
  }

  let maskedValue = ''

  if (numericValue.length > 5) {
    maskedValue = `${numericValue.substring(0, 5)}-${numericValue.substring(5)}`
  } else {
    maskedValue = numericValue
  }

  return maskedValue
}

export const cnpj = (value = '') => {
  const maxLength = 14

  let numericValue = value.replace(/\D/g, '')

  if (numericValue.length > maxLength) {
    numericValue = numericValue.slice(0, maxLength)
  }

  let maskedValue = ''

  if (numericValue.length > 2) {
    maskedValue = `${numericValue.substring(0, 2)}.${numericValue.substring(2)}`

    if (numericValue.length > 5) {
      maskedValue = `${maskedValue.substring(0, 6)}.${maskedValue.substring(6)}`

      if (numericValue.length > 8) {
        maskedValue = `${maskedValue.substring(0, 10)}/${maskedValue.substring(
          10
        )}`

        if (numericValue.length > 12) {
          maskedValue = `${maskedValue.substring(
            0,
            15
          )}-${maskedValue.substring(15)}`
        }
      }
    }
  } else {
    maskedValue = numericValue
  }

  return maskedValue
}

export const dataNascimento = (value = '') => {
  const maxLength = 10

  let numericValue = value.replace(/\D/g, '')

  if (numericValue.length > maxLength) {
    numericValue = numericValue.slice(0, maxLength)
  }

  let maskedValue = ''

  if (numericValue.length > 2) {
    maskedValue = `${numericValue.substring(0, 2)}/${numericValue.substring(2)}`

    if (numericValue.length > 4) {
      maskedValue = `${maskedValue.substring(0, 5)}/${maskedValue.substring(5)}`

      if (numericValue.length > 9) {
        maskedValue = `${maskedValue.substring(0, 10)}`
      }
    }
  } else {
    maskedValue = numericValue
  }

  return maskedValue
}

export const rg = (value = '') => {
  const maxLength = 7

  let numericValue = value.replace(/\D/g, '')
  let maskedValue = ''

  if (numericValue.length > maxLength) {
    numericValue = numericValue.slice(0, maxLength)
  }
  maskedValue = numericValue

  return maskedValue
}

export const date = (date) => {

  return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(
    0,
    4
  )}`
}

