import { Observable } from 'rxjs';
import { LikeRecord } from './like.record';

export interface RevendicationRecord {
    id?: string;
    title?: string;
    author?: string;
    constat?: string;
    content?: string;
    photo?: string;
    category?: any;

    createdAt?: any;
    updatedAt?: any;

    userid?: any;
    _random?: any;
    voters?: LikeRecord[];
}
