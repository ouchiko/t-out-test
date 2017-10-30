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

    /**
     * Filter the data into those venue we can and cannot goto
     *
     */
    doFiltering()
    {
        // Result Object.
        let results = new Results();

        // Process Venues.
        for (let i=0; i<this._venues.length; i++) {
            let venue = this._venues[i];
            let venuestatus = true;
            // Process People.
            for (let k=0; k<this._people.length; k++) {
                let person = this._people[k];
                // What wont they eat!
                for (let j=0;j<person.wont_eat.length;j++) {
                    if (venue.food.includes(person.wont_eat[j])) {
                        venuestatus = false;
                        results.addAvoidVenue({
                            name: person.name,
                            class: 'food',
                            reason: person.wont_eat[j],
                            restaurant: venue.name
                        });
                        // We could break here, we can keep compiling a list
                        // of null people or break out?
                        break;
                    }
                }
                // What will they drink.
                let drinkstatus = false;
                for (let j=0;j<person.drinks.length;j++) {
                    if (venue.drinks.includes(person.drinks[j])) {
                        drinkstatus = true;
                    }
                }
                if (!drinkstatus) {
                    results.addAvoidVenue({
                        name: person.name,
                        class: 'drink',
                        reason: 'generic',
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
