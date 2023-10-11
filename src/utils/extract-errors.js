const extractMessageError = (error, parentProperty = '') => {
  const property = parentProperty
    ? `${parentProperty}.${error.property}`
    : error.property

  const message = Object.values(error.constraints).toString()

  return { property, message }
}

export const extractErrors = (errors, parentProperty = '') => {
  const extractedErrors = []

  errors.forEach((error) => {
    if (error.children.length > 0) {
      const property = parentProperty
        ? `${parentProperty}.${error.property}`
        : error.property
      const subErrors = extractErrors(error.children, property)
      extractedErrors.push(...subErrors)
    } else {
      extractedErrors.push(extractMessageError(error, parentProperty))
    }
  })

  return extractedErrors
}

export const ProcessingErros = (error = '', currentMsg = '') => {
  if (error && error.response && error.response.data) {
    const { statusCode, message } = error?.response?.data
    if (statusCode == 400) {
      return extractErrors(message).map(({ message }) => message)
    }

    if (statusCode == 404 && currentMsg) {
      return [currentMsg]
    }

    return [`Serviço indisponível: ${statusCode}`]
  } else return [`Erro não identificado`]
}
