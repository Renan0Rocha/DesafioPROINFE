// ---------------------------------------------------------------------

export const ParamsUrl = (values, secon = false) => {
  const params = []

  for (const key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      const value = values[key]
      if (value !== undefined && value !== null && value != '') {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      }
    }
  }

  if (params.length >= 1) {
    if (secon) return `&${params.join('&')}`
    return `?${params.join('&')}`
  }
  return ''
}

export const RedirectUrl = (url = '', authorization = '', verbo = 'GET') => {
  const xhr = new XMLHttpRequest()

  xhr.open(verbo, url)

  if (authorization)
    xhr.setRequestHeader('Authorization', `Bearer ${authorization}`)

  xhr.onload = () => {
    window.location.replace(xhr.responseURL)
  }

  xhr.send()
}
