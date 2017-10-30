/**
 * Results.
 * Stores a bunch of results based on out filtering.
 */
class Results
{
    /**
     * Define the cango/avoid items
     */
    constructor()
    {
        this.cango = [];
        this.avoid = {};
    }

    /**
     * Adds an acceptable venue to visit
     *
     * @param <json> venue
     */
    addAcceptableVenue(venue)
    {
        this.cango.push(venue);
    }

    /**
     * Adds a venue to avoid.  Assigns the person to this.
     * This could be better
     *
     * @param <json> reason
     */
    addAvoidVenue(reason)
    {
        if (!this.avoid[reason.restaurant]) {
            this.avoid[reason.restaurant] = {
                "appRestaurantName": reason.restaurant,
                "people": []
            };
        }
        this.avoid[reason.restaurant]['people'].push(reason);
    }

    /**
     * Returns the details of the results.
     */
    getDetails()
    {
        return [this.cango, this.avoid];
    }
}
export default Results;
