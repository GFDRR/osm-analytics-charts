const { ODRI, fetch, process, URL } = window

const url = new URL(window.location.href)
const from =
  (url.searchParams.get('from') && new Date(url.searchParams.get('from'))) ||
  new Date(2000, 1, 1)
const to =
  (url.searchParams.get('to') && new Date(url.searchParams.get('to'))) ||
  new Date()

const period = [from, to].map(d => d.toISOString().substr(0, 10)).join()
const precision = 13
const apiUrl = `${process.env.SANDBOX_ENDPOINT}/stats/all/country/PRT?period=${period}&precision=${precision}`
// const apiUrl = `${process.env.SANDBOX_ENDPOINT}/stats/all/polygon/exnqFjwn%5EzNvvGhtHj%7D%40%7CyB_pCgAthBeoPtaDqaAr~CbrKkm%40j%7CJ%7CtZaPxfEa~KljCyy%40ubBc%7D%40ngDa%7DLa%7DK%7CmCpqBsxJytVhr%40crH%7De%40t%60B%7DxBm%7BCi_BwpTflAyeA%7CfAfqHbrCqvFslBy~RchFqi%40zZgyVdjDbqKoVosEdzDxxA%7BYtqEfoNwtJrlE%7CPziCmvGdx%40vyPqsDv%7CBvxBzEfQraK%7BfGvnDteFjuI?period=${period}`

function mountViz (data) {
  const datesUI = document.querySelector('#dates')
  const format = d => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  datesUI.innerHTML = `from: ${format(from)}, to: ${format(to)}`
  ODRI.inlineStat('#buildingsUsers', {
    data,
    featureType: 'buildings',
    stat: 'users'
  })
  ODRI.inlineStat('#buildingsActivity', {
    data,
    featureType: 'buildings',
    stat: 'activity'
  })
  ODRI.overallStats('#overallStats', {
    data,
    stats: [
      {
        featureType: 'buildings',
        stat: 'activity'
      },
      {
        featureType: 'highways',
        stat: 'activity'
      },
      {
        featureType: 'waterways',
        stat: 'activity'
      },
      {
        featureType: 'buildings',
        stat: 'users'
      },
      {
        featureType: 'highways',
        stat: 'users'
      },
      {
        featureType: 'waterways',
        stat: 'users'
      }
    ]
  })
  ODRI.activity('#activity', {
    data,
    apiUrl,
    range: [from, to],
    precision,
    facet: 'users', // features
    granularity: 'monthly' // daily, weekly
  })
  ODRI.compareMap('#compare-map', {
    width: '100%',
    height: '500px',
    settings: {
      default_feature_type: 'buildings',
      // iframe_base_url:
      // polygon:
      default_start_year: 2011,
      default_end_year: 2014
    }
  })
  ODRI.contributors('#contributors', {
    data,
    apiUrl,
    numUsers: 15,
    featureType: 'waterways'
  })
}

function timeoutPromise (timeout, err, promise) {
  return new Promise(function (resolve, reject) {
    promise.then(resolve, reject)
    setTimeout(reject.bind(null, err), timeout)
  })
}

document.addEventListener('DOMContentLoaded', function () {
  timeoutPromise(20000, new Error('Server timed out!'), fetch(apiUrl))
    .then(r => r.json())
    .then(mountViz)
})
