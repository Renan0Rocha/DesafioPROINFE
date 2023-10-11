export const removeEmptyFields = (obj, fieldsToSkip = []) => {
  for (const prop in obj) {
    if (fieldsToSkip.includes(prop)) {
      continue
    }

    const value = obj[prop]

    if (value === null) {
      delete obj[prop]
    } else if (value !== undefined) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        removeEmptyFields(value, fieldsToSkip)

        if (Object.keys(value).length === 0) {
          delete obj[prop]
        }
      } else if (
        typeof value === 'string' &&
        (value === '' || value.trim() === '')
      ) {
        delete obj[prop]
      }
    }
  }
  return obj
}

export const removeFieldsNotUpdated = (obj1, obj2, ignoreProperties = []) => {
  const diffObj = {}

  for (const prop in obj1) {
    if (typeof obj2[prop] === 'undefined') {
      diffObj[prop] = obj1[prop]
    } else if (
      typeof obj1[prop] === 'object' &&
      typeof obj2[prop] === 'object' &&
      !Array.isArray(obj1[prop]) &&
      !Array.isArray(obj2[prop])
    ) {
      const nestedDiff = removeFieldsNotUpdated(obj1[prop], obj2[prop])
      if (Object.keys(nestedDiff).length > 0) {
        diffObj[prop] = nestedDiff
      }
    } else if (Array.isArray(obj1[prop]) && Array.isArray(obj2[prop])) {
      if (JSON.stringify(obj1[prop]) !== JSON.stringify(obj2[prop])) {
        diffObj[prop] = obj2[prop]
      }
    } else if (obj1[prop] !== obj2[prop]) {
      diffObj[prop] = obj2[prop]
    }
  }

  for (const prop in obj2) {
    if (typeof obj1[prop] === 'undefined') {
      diffObj[prop] = obj2[prop]
    }
  }

  for (const prop of ignoreProperties) {
    if (typeof obj2[prop] !== 'undefined') {
      diffObj[prop] = obj2[prop]
    }
  }

  return diffObj
}

export const removeUnnecessaryFieldsUpdate = (obj) => {
  let { contato, endereco, ...rest } = obj
  if (contato) {
    const { id, ...restContato } = contato
    contato = restContato
  }
  if (endereco) {
    const { id, cidade, ...restEndereco } = endereco

    if (cidade) {
      const { id } = cidade
      endereco = { ...restEndereco, cidade: { id: id } }
    }
  }
  return { ...rest, contato, endereco }
}

export const replaceCommonValues = (obj1, obj2) => {
  if (!obj1) return obj2

  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        typeof obj2[key] === 'object' &&
        obj2[key] !== null &&
        !Array.isArray(obj2[key])
      ) {
        if (!obj1.hasOwnProperty(key)) {
          obj1[key] = {}
        }
        replaceCommonValues(obj1[key], obj2[key])
      } else {
        obj1[key] = obj2[key]
      }
    }
  }
  return obj1
}
