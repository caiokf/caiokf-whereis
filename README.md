## Where is CaioKF

**Live website**: http://travelcosts.herokuapp.com

This is a website to calculat how much a trip would cost.

It takes as input a list of user-entered locations and how many days he plans to spend on each, as well as some basic lifestyle parameters for food, accommodation and transportation. As a result, it displays the cost of the trip.

### Current Version

As of now, only one city is supported for calculations, and no option to set number of days in each location is available

Pre-requisites
-------------

- [MongoDB](http://www.mongodb.org/downloads)
- [Node.js](http://nodejs.org)


Getting Started with the code
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
$ git clone https://github.com/caiokf/travel-costs.git
$ cd travel-costs
$ git remote rm origin

# Install NPM dependencies
$ npm install

$ node app.js
```
