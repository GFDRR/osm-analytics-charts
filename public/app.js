const { ODRI, fetch, process } = window

function mountViz (data) {
  ODRI.activity('#activity', { data })
  ODRI.compareMap('#compare-map', {
    width: '100%',
    height: '500px',
    settings: {
      defaultFeatureType: 'highways'
    }
  })
  ODRI.contributors('#contributors', { data })
}

document.addEventListener('DOMContentLoaded', function () {
  fetch(`${process.env.SANDBOX_ENDPOINT}/HTI`)
    .then(r => r.json())
    .then(mountViz)
})
