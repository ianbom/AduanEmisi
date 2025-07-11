export interface District {
    id: number;
    name: string;
    city_id: number;
}

export interface City {
    id: number;
    name: string;
    province_id: number;
    districts?: District[];
}

export interface Province {
    id: number;
    name: string;
    cities?: City[];
}
