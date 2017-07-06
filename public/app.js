const { ODRI, fetch, process, URL } = window

function mountViz (data) {
  const url = new URL(window.location.href)
  const from = (url.searchParams.get('from') && new Date(url.searchParams.get('from'))) || new Date(2000, 1, 1)
  const to = (url.searchParams.get('to') && new Date(url.searchParams.get('to'))) || new Date()

  const datesUI = document.querySelector('#dates')
  const format = d => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  datesUI.innerHTML = `from: ${format(from)}, to: ${format(to)}`

  ODRI.activity('#activity', { data, range: [from, to] })
  ODRI.compareMap('#compare-map', {
    width: '100%',
    height: '500px',
    settings: {
      default_feature_type: 'highways'
    }
  })
  ODRI.contributors('#contributors', { data })
}

function timeoutPromise (timeout, err, promise) {
  return new Promise(function (resolve, reject) {
    promise.then(resolve, reject)
    setTimeout(reject.bind(null, err), timeout)
  })
}

document.addEventListener('DOMContentLoaded', function () {
  // const url = `${process.env.SANDBOX_ENDPOINT}/HTI`
  const url = `${process.env.SANDBOX_ENDPOINT}`
  timeoutPromise(2000, new Error('Server timed out!'), fetch(url))
    .then(r => r.json())
    .then(mountViz)
})
