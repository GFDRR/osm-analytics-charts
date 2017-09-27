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

## Compare map
![Compare map](https://github.com/GFDRR/osm-analytics-charts/blob/master/samples/map.png?raw=true 'Compare map')

The compare map consists of a trimmed-down, embedded version of the OSM Analytics site. It uses a slider to show the status 
of OSM contributions in two dates, allowing a seamless visual comparison between them.

- __width__
- __height__
- __settings.default_feature_type__ (`buildings`) compare `buildings` or `highways` or `waterways`
- __settings.iframe_base_url__
- __settings.polygon__ an encoded polyline of the area of interest related to the project (ie `ifv%7BDndwkBx%60%40aYwQev%40sHkPuf%40ss%40%7BfA_%40uq%40xdCn%7D%40%5E`))
- __settings.default_start_year__ (`2016`) represents the default start year
- __settings.default_end_year__ (`now`) represents the default end year. `now` can also be provided to compare with latest OSM data

## Activity chart
![Activity chart](https://github.com/GFDRR/osm-analytics-charts/blob/master/samples/activity.png?raw=true "Activity chart")

The activity charts illustrate a comparison between contributions done on multiple OSM features. As the features may not be directly aggregatable,
a simplified [https://en.wikipedia.org/wiki/Mahalanobis_distance](Mahalanobis distance) calculation is used to aggregate contributions.  

- __data__ (mandatory) raw data from the <a href="https://github.com/GFDRR/osm-analytics-api">OSM Analytics API</a>, it has to be loaded externally
- __apiUrl__ provide an API url for the 'Download data' button
- __range__ (mandatory) (`[2010-03-06,2016-01-01`) time range displayed, as a [from, to] array, regardless of the data provided
- __facet__ visible facet when loading the widget, must be 'users' or 'features' (default)
- __granularity__ visible granularity by default, must be 'monthly', 'weekly' or 'daily' (default)



## Top contributors
![Contributors chart](https://github.com/GFDRR/osm-analytics-charts/blob/master/samples/contributors.png?raw=true "Contributors chart")

The contributors chart shows a list of the top users for the given filter options, and an aggregated value for the remaining contributions

- __data__ (mandatory) raw data from the <a href="https://github.com/GFDRR/osm-analytics-api">OSM Analytics API</a>, it has to be loaded externally
- __apiUrl__ provide an API url for the 'Download data' button
- __numUsers__ number of users displayed, defaults to 10,
- __featureType__ (`buildings`) buildings, highways or waterways


# See also:

- [OSMA charts integration for Wordpress](https://github.com/Vizzuality/wp-osma-charts)
- [OpendDRI website](https://github.com/GFDRR/opendri-website)
