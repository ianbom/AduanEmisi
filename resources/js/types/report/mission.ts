import { User } from '../user/interface';
import { MissionDocumentation } from './missionDocumentation';
import { Report } from './report';
export interface Mission {
    id: number;
    report_id: number;
    report: Report;
    assignedVolunteer?: User;
    creator?: {
        name: string;
    };
    creator_user_id: number;
    province_id: number;
    city_id: number;
    district_id: number;
    province: { name: string };
    city: { name: string };
    district: { name: string };
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    address: string;
    status: string;
    scheduled_date: string;
    completed_at: string | null;
    assigned_to_type: string | null;
    assigned_volunteer_id: number | null;
    created_at: string;
    updated_at: string;
    volunteers?: {
        is_leader: boolean;
    };
    documentation: MissionDocumentation[];
}
