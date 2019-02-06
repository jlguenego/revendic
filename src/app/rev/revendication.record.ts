import { Observable } from 'rxjs';

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
    likes$?: Observable<any>;
    dislikes$?: Observable<any>;
    voters$?: Observable<any>;
}
