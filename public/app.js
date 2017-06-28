const { ODRI, fetch, process } = window

function mountViz (data) {
  ODRI.activity('#activity', { width: '670px', data })
  ODRI.topContributors('#top-contributors', { width: '300px', data })
}

document.addEventListener('DOMContentLoaded', function () {
  fetch(process.env.SANDBOX_ENDPOINT).then(r => r.json()).then(mountViz)
})
