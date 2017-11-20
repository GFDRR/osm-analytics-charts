export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const FACETS = {
  Features: 'Features',
  Users: 'Users'
}

export const USER_SCOPES = {
  all: 'All users',
  local: 'Local only'
}

export const GRANULARITIES = {
  Daily: 'Daily',
  Weekly: 'Weekly',
  Monthly: 'Monthly'
}

export const COMPARE_MAP_DEFAULTS = {
  iframe_base_url: 'https://osm-analytics-ui.vizzuality.com/',
  polygon:
    'ifv%7BDndwkBx%60%40aYwQev%40sHkPuf%40ss%40%7BfA_%40uq%40xdCn%7D%40%5E',
  default_start_year: '2010',
  default_end_year: 'now',
  default_feature_type: 'buildings'
}

export const VALID_FEATURE_TYPES = ['buildings', 'highways', 'waterways']

export const ACTIVITY_HELP_URL =
  'https://github.com/GFDRR/osm-analytics-charts/blob/master/README.md#aggregation-method-for-contributions-on-different-features'
