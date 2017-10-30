class Results
{
    constructor()
    {
        this.cango = [];
        this.avoid = {};
    }

    addAcceptableVenue(venue)
    {
        this.cango.push(venue);
    }

    addAvoidVenue(reason)
    {
        if (!this.avoid[reason.restaurant]) {
            this.avoid[reason.restaurant] = {
                "appRestaurantName": reason.restaurant,
                "people": {

                }
            };
        }
        this.avoid[reason.restaurant]['people'][reason.name] = reason;
    }

    getDetails()
    {
        return [this.cango, this.avoid];
    }
}
export default Results;
