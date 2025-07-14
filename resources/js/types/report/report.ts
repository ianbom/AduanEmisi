import { User } from '../user/interface';
import { MediaItem } from './media';
export interface Report {
    id: number;
    title: string;
    category: string;
    reporter?: User;
    description: string;
    province: { name: string };
    city: { name: string };
    district: { name: string };
    status: string;
    image?: string;
    hasMission?: boolean;
    upvotes_count: number;
    dislikes_count: number;
    created_at: string;
    media: MediaItem[];
    mission?: {
        title: string;
        assignedTo: string;
        teamLeader: string;
        members: number;
        documentation?: {
            image: string;
            caption: string;
            uploader: string;
        }[];
    };
    address: string;
    latitude: number;
    longitude: number;
    data: [];
}
