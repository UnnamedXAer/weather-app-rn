import { Coords } from '../Types/CustomeTypes'

export default class LocationModel {
    id?: number;
    coords: Coords;
    city: string;
    country: string;
    countryCode: string;
    postalCode: string;
    region: string;

    constructor(params: LocationModel) {
        const {
            id,
            coords,
            city,
            country,
            countryCode,
            postalCode,
            region,
        } = params;

        this.id = id;
        this.coords = coords;
        this.city = city;
        this.country = country;
        this.countryCode = countryCode;
        this.postalCode = postalCode;
        this.region = region;
    }
}