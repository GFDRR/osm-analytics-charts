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

## Overall statistics table

![Statistics table](https://github.com/GFDRR/osm-analytics-charts/blob/master/samples/statistics.png?raw=true 'Statistics table')

Presents a set of configurable statistics about contributions done to OSM. 

- __statistics__ (mandatory) (`[{featureType: 'highways', stat: 'users'}]`) an array of widgets objects, each being of the following form:
```
{
  featureType: 'highways'|'buildings'|'waterways'
  stat: 'activity'|'users'
}
```
- __country__ or __polygon__ (mandatory) ISO3 country code or an encoded polyline of the area of interest related to the project (ie `ifv%7BDndwkBx%60%40aYwQev%40sHkPuf%40ss%40%7BfA_%40uq%40xdCn%7D%40%5E`))
- __start_date__ (mandatory) (`2016-01-01`) represents the start date of an OpenDRI project
- __end_date__ (mandatory) (`2017-01-01`) represents the end date of an OpenDRI project
- __precision__ (`13`) value between 1 and 13, specifying accuracy of data to display.

## Single statistics value

Renders a plain value, with no formatting or unit.

- __country__ or __polygon__ (mandatory) ISO3 country code or an encoded polyline of the area of interest related to the project (ie `ifv%7BDndwkBx%60%40aYwQev%40sHkPuf%40ss%40%7BfA_%40uq%40xdCn%7D%40%5E`))
- __start_date__ (mandatory) (`2016-01-01`) represents the start date of an OpenDRI project
- __end_date__ (mandatory) (`2017-01-01`) represents the end date of an OpenDRI project
- __feature_type__ (mandatory) (`buildings`) `buildings`, `waterways` or `waterways`
- __statistic__ (mandatory) (`users`) type should be either `users` or `activity`. `users` statistics are only available if precision is set to 13.
- __precision__ (`13`) value between 1 and 13, specifying accuracy of data to display.

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
- __facet__ visible facet when loading the widget, must be 'users' or 'features' (default). `users` statistics are only available if precision is set to 13.
- __granularity__ visible granularity by default, must be 'monthly', 'weekly' or 'daily' (default)
- __precision__ (`13`) value between 1 and 13, specifying accuracy of data to display.

#### Aggregation method for contributions on different features

As information regarding activity in the OSM database is expressed in different units (i.e. number of km for roads or number of individual entries in the case of buildings) we had to normalize the values in order to aggregate them in a meaningful way. The approach we chose is a simplified <a href="https://en.wikipedia.org/wiki/Mahalanobis_distance">Mahalanobis distance</a> (multi-dimensional generalization of the idea of measuring how many standard deviations away a point is from the mean of a distribution) in which, by removing the original dimension from the original data, we are able to describe the features in regards to the whole set of points, allowing us to finally aggregate features of different units in the same histogram. 

More info: [source code](https://github.com/GFDRR/osm-analytics-charts/blob/master/src/activity/activity.jsx#L116)

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
