# OpenDRI charts sandbox

This repository holds a development sandbox for the OpenDRI site graphs developed by [vizzuality](http://www.vizzuality.com/).  

The sanbox simulates a generic html environment in which the different graphs will be instantiated via vanilla javascript invocations.  

The repository also contains all necessary dependencies to develop the separate visualizations and bundle them into a library/ies.

# Requirements

- [nodejs](https://nodejs.org/en/)

# Installation

First clone this repository:

```
git clone https://github.com/Vizzuality/opendri-charts
```

then install the required nodejs packages using `npm` (already bundled with recent nodejs installations):

```
npm install
```

# Development

To start a development server run:

```
npm run server
```

To override default endpoints configuration:
```
cp public/.env.sample.js public /.env.js
```

Then edit to override.

# Production

To bundle all the dependencies and minify the code run:

```
npm run bundle
```


# Charts configuration

## Activity chart

- __startDate__ (`2016-01-01`) represents the start date of an OpenDRI project
- __endDate__ (`2017-01-01`) represents the end date of an OpenDRI project
- __defaultGranularity__ (`daily`) show activity `daily|weekly|monthly` by default
- __defaultFacet__ (`features`) show either `features` or `users` histogram by default

## Before/after map

Provide either of:
- __country__ <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3">ISO3</a> code of the country related to the project (ie `ESP`)
- __polygon__ an encoded polyline of the area of interest related to the project (ie `ifv%7BDndwkBx%60%40aYwQev%40sHkPuf%40ss%40%7BfA_%40uq%40xdCn%7D%40%5E`))

- __defaultStartYear__ (`2016`) represents the start year of an OpenDRI project
- __defaultEndYear__ (`now`) represents the end year of an OpenDRI project. `now` can also be provided to compare with latest OSM data
- __defaultFeatureType__ (`buildings`) compare `buildings` or `highways`

## Top contributors

- __startDate__ (`2016-01-01`) represents the start date of an OpenDRI project
- __endDate__ (`2017-01-01`) represents the end date of an OpenDRI project
- __defaultTab__ (`all`) show `all` or `local` users by default
