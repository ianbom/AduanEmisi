import {User} from '@/types/user/interface'
import { Report } from './report';

export interface Donation {
    id: number | string;
    user: User;
    report: Report;
    amount: number;
    payment_method: string;
    transaction_id: string;
    snap_token: string;
    payment_response: string;

}
