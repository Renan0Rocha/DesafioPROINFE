export const getLocalItem = (key) => {
  if (typeof window === 'undefined') return
  const data = window.localStorage.getItem(key)

  return JSON.parse(data)
}

export const setLocalItem = (key, value) => {
  if (typeof window === 'undefined') return
  const data = JSON.stringify(value)

  localStorage.setItem(key, data)
}

export const removeLocalItem = (key) => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(key)
}

export const clearLocal = () => {
  if (typeof window === 'undefined') return

  localStorage.clear()
}

// ----------------------------------------------------------------------

export const getSessionItem = (key) => {
  if (typeof window === 'undefined') return
  const data = window.sessionStorage.getItem(key)

  return JSON.parse(data)
}

export const setSessionItem = (key, value) => {
  if (typeof window === 'undefined') return
  const data = JSON.stringify(value)

  sessionStorage.setItem(key, data)
}

export const RemoveSessionItem = (key) => {
  if (typeof window === 'undefined') return

  if (Array.isArray(key)) {
    key.forEach((item) => {
      sessionStorage.removeItem(item)
    })
  } else {
    sessionStorage.removeItem(key)
  }
}

export const clearSession = () => {
  if (typeof window === 'undefined') return

  sessionStorage.clear()
}
