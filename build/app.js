const ODRI = window.ODRI

document.addEventListener('DOMContentLoaded', function () {
  ODRI.dailyActivity('#daily-activity', { width: '200px' })
  ODRI.beforeAfter('#before-and-after', { width: '100px' })
  ODRI.topContributors('#top-contributors', { width: '300px' })
})
