import Results from './Results';

class VenueProcess
{
    /**
     * Defines our venues and people
     *
     * @param <json> Venues
     * @param <json> People
     */
    constructor(Venues, People)
    {
        this._venues = Venues;
        this._people = People;
    }

    caseFix(items) {
        return items.map(function(v) {
            return v.toLowerCase();
        });
    }

    /**
     * Filter the data into those venue we can and cannot goto
     */
    doFiltering()
    {
        // Result Object.
        let notPossible = [];
        let results = new Results();

        // Process Venues.
        for (let i=0; i<this._venues.length; i++) {
            let venue = this._venues[i];
            let venuestatus = true;
            let tmpvenues = [];

            venue.drinks = this.caseFix(venue.drinks);
            venue.food = this.caseFix(venue.food);

            // Process People.
            for (let k=0; k<this._people.length; k++) {
                let caneat = false;
                let candrink = false;
                let person = this._people[k];

                person.drinks = this.caseFix(person.drinks);
                person.wont_eat = this.caseFix(person.wont_eat);

                // More food at the venue than they wont eat, sorted
                //if (!notPossible[venue.name]) {
                    if (venue.food.length>person.wont_eat.length || venue.food.length == 0) {
                        caneat = true;
                    } else if (venue.food){
                        /* Only now where venue has same option count as person dislike count */
                        for (let i=0;i<venue.food.length;i++) {
                            if (!person.wont_eat.includes(venue.food[i])) {
                                caneat = true;
                            }
                        }
                    }
                //}

                // Dont bothe rchecking if we can't eat there.
                if (caneat) {
                    candrink = venue.drinks.some(v => person.drinks.includes(v));
                }

                /* Avoid or not? */
                if (!caneat||!candrink) {
                    venuestatus = false;
                    notPossible[venue.name] = 1;
                    results.addAvoidVenue({
                        name: person.name,
                        restaurant: venue.name
                    });
                }
            }
            // Good venue!
            if (venuestatus) {
                results.addAcceptableVenue({
                    venue: venue
                });
            }
        }

        return results.getDetails();
    }
}

export default VenueProcess;
