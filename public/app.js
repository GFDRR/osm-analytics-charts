const { ODRI, fetch } = window

function mountViz (data) {
  ODRI.activity('#activity', { data })
  ODRI.contributors('#contributors', { data })
}

document.addEventListener('DOMContentLoaded', function () {
  console.warn('🤓 add fetch and promise polyfill not present!')
  fetch('./mocks/buildings_country_hti.json')
    .then(r => r.json())
    .then(mountViz)
})
