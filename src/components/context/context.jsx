import { h } from 'preact'
import { parse, format, addDays } from 'date-fns'

import appStyles from 'styles.scss'

const Context = ({ data }) => {
  const subtitles = []
  if (data.min_date !== undefined) {
    const dates = [data.min_date, data.max_date]
      .map(d => parseInt(d * 1000))
      .map(d => parse(d))
      .map(d => addDays(d, 1))
      .map(d => format(d, 'MMM Do, YYYY'))
      .join(' to ')
    subtitles.push(dates)
  }
  if (data.country_name !== undefined) {
    subtitles.push(`Area: ${data.country_name}`)
  }

  if (!subtitles.length) return null

  return (
    <div class={appStyles.subtitle}>
      {subtitles.join('. ')}
    </div>
  )
}

export default Context
