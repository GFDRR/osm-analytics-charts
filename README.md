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

# Production

To bundle all the dependencies and minify the code run:

```
npm run bundle
```
