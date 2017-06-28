import { h } from 'preact'

import { mountComponent } from 'utils'
import { COMPARE_MAP_DEFAULTS } from 'src/constants'

const CompareMap = ({ width, height, settings }) => {
  const finalSettings = Object.assign(COMPARE_MAP_DEFAULTS, settings)
  const iframeUrl = `${finalSettings.iframeBaseUrl}/#/compare
  /polygon:${finalSettings.polygon}
  /${finalSettings.defaultStartYear}...${finalSettings.defaultEndYear}
  /${finalSettings.defaultFeatureType}
  /embed`

  return (
    <iframe
      scrolling="no"
      style={{ width, height, border: 0 }}
      src={iframeUrl}
    />
  )
}

export default function topContributors (selector, options) {
  return mountComponent(CompareMap, selector, options)
}
