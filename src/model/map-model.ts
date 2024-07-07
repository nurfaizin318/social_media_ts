


export type GetPolylineRequest = {
    location : String,
    destination : String
}

export interface ResponsePolyline {
    routes:    Route[];
    waypoints: Waypoint[];
}


export type GetListPlaceRequest =  {
    place: string;
}

export interface Route {
    geometry:    string;
    legs:        Leg[];
    weight_name: string;
    weight:      number;
    duration:    number;
    distance:    number;
}

export interface Leg {
    steps:    any[];
    summary:  string;
    weight:   number;
    duration: number;
    distance: number;
}

export interface Waypoint {
    hint:     string;
    distance: number;
    name:     string;
    location: number[];
}


export interface ResponsePlace {
    place_id:     number;
    licence:      string;
    osm_type:     string;
    osm_id:       number;
    lat:          string;
    lon:          string;
    category:     string;
    type:         string;
    place_rank:   number;
    importance:   number;
    addresstype:  string;
    name:         string;
    display_name: string;
    address:      Address;
    boundingbox:  string[];
}

export interface Address {
    road:             string;
    town:             string;
    county:           string;
    state:            string;
    "ISO3166-2-lvl4": string;
    region:           string;
    "ISO3166-2-lvl3": string;
    postcode:         string;
    country:          string;
    country_code:     string;
}