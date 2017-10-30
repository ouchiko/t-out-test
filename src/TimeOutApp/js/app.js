import Venues from './data/venues.json';
import People from './data/people.json';
import VenueProcess from './VenueProcess';

// Because why not!
window.$ = require("jquery");
window.Vue = require("Vue");


document.addEventListener("DOMContentLoaded",function(){
    let venueProcess = new VenueProcess(Venues, People);
    let [cango, avoid] = venueProcess.doFiltering();

    console.dir(cango);
    console.dir(avoid);

    new Vue({
      el: '#app',
      data: {
        count: cango.length,
        cango: cango,
        avoid: avoid
      }
    });


});
