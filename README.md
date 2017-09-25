# OSM analytics charts

This repository contains a set of charts based on the data from [OSM analytics](http://osm-analytics.org) site and API.

It was developed primarily to integrate the above mentioned data on [the OpenDRI website](https://opendri.org) but it can be easily used in other contexts.

It also contains a basic application server that hosts a sandbox containing the charts above, for development and test purposes.

# Requirements

- [nodejs](https://nodejs.org/en/)

# Installation

Use [npm](https://www.npmjs.com/) to install all dependencies.

```
npm install
```

# Development

To start a development server run:

```
npm run server
```

The sandbox page should now be available on [http://localhost:8080](http://localhost:8080)

# Configuration

The project comes preconfigured with sensible defaults, which should work in most cases.

If you want to override the default endpoints configuration, you need to duplicate the configuration file:

```
cp public/env.sample.js public/env.js
```

Then edit to override. You may need to restart the application server after you change the settings.

# Production

To bundle all the dependencies and minify the code run:

```
npm run build
```

This creates `public/bundle.js` and `public/styles.css` which contain the minified, production-ready version of this library.


# Charts configuration

Note: parameters are snake_cased to be consistent with WP API requirements

## Activity chart

- __start_date__ (`2016-01-01`) represents the start date of an OpenDRI project
- __end_date__ (`2017-01-01`) represents the end date of an OpenDRI project
- __default_granularity__ (`daily`) show activity `daily|weekly|monthly` by default
- __default_facet__ (`features`) show either `features` or `users` histogram by default

## Before/after map

- __iframe_base_url__ (`http://localhost:3000`)
- __polygon__ an encoded polyline of the area of interest related to the project (ie `ifv%7BDndwkBx%60%40aYwQev%40sHkPuf%40ss%40%7BfA_%40uq%40xdCn%7D%40%5E`))
- __default_start_year__ (`2016`) represents the start year of an OpenDRI project
- __default_end_year__ (`now`) represents the end year of an OpenDRI project. `now` can also be provided to compare with latest OSM data
- __default_feature_type__ (`buildings`) compare `buildings` or `highways`

## Top contributors

- __start_date__ (`2016-01-01`) represents the start date of an OpenDRI project
- __end_date__ (`2017-01-01`) represents the end date of an OpenDRI project
- __num_users__ (`10`)

# See also:

- [OSMA charts integration for Wordpress](https://github.com/Vizzuality/wp-osma-charts)
- [OpendDRI website](https://github.com/GFDRR/opendri-website)
