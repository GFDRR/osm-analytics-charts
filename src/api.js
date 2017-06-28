const { fetch } = window

const HOST = 'http://54.224.10.82/api/v1/'

export const getCountryMeta = (ISO, scope = 'all') => {
  return fetch(`${HOST}stats/${scope}/country/${ISO}`, {mode: 'no-cors'})
}
