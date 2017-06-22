import dailyActivity from './daily-activity'
import beforeAfter from './before-after'
import topContributors from './top-contributors'

// quick entry point that exports global object
window.ODRI = window.ODRI || {
  dailyActivity,
  beforeAfter,
  topContributors
}
