export interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    province_id: number | null;
    city_id: number | null;
    role: string | null;
    district_id: number | null;
    address: string | null;
    city: {
        name: string;
    };
    district: {
        name: string;
    };
    province: {
        name: string;
    };
    profile_url?: string;
    created_at: string | null;
    updated_at: string | null;
    community?: {
        name: string;
    };
    status: string;
}
