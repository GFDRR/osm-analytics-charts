const { ODRI, fetch } = window

function mountViz (data) {
  ODRI.activity('#activity', { width: '500px', data })
  ODRI.topContributors('#top-contributors', { width: '300px', data })
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('./mocks/buildings_country_hti.json').then(r => r.json()).then(mountViz)
})
