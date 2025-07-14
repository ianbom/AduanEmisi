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
    cities: {
        id: number;
        name: string;
        districts: { id: number; name: string }[];
    }[];
}
