const { ODRI, fetch } = window

function mountViz (data) {
  ODRI.activity('#activity', { width: '670px', data })
  ODRI.topContributors('#top-contributors', { width: '300px', data })
}

document.addEventListener('DOMContentLoaded', function () {
  console.warn('🤓 add fetch and promise polyfill not present!')
  fetch('./mocks/buildings_country_hti.json')
    .then(r => r.json())
    .then(mountViz)
})
