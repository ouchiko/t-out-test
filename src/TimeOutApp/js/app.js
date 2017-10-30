require("!style-loader!css-loader!../css/app.css");

import Venues from './data/venues.json';
import People from './data/people.json';
import VenueProcess from './VenueProcess';

window.Vue = require("Vue");

document.addEventListener("DOMContentLoaded",function(){
    // Process the venues and people together.
    let venueProcess = new VenueProcess(Venues, People);
    let [cango, avoid] = venueProcess.doFiltering();

    // Define our data sets and process via Vue.
    new Vue({
      el: '#app',
      data: {
        count: cango.length,
        cango: cango,
        avoid: avoid
      }
    });
});
