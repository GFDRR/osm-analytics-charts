import activity from './activity'
import compareMap from './compare-map'
import topContributors from './top-contributors'

require('es6-promise').polyfill()
require('isomorphic-fetch')

export { activity, compareMap, topContributors }
