import { Badge } from "../badge/interface";
import { User } from "./interface";

export interface UserBadge {
    id: number;
    user_id: number;
    badge_id: number;
    created_at: string;
    updated_at: string;
    badge: Badge; // Include the badge relation
}
