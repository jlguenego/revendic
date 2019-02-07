export interface RevendicationRecord {
    id?: string;
    title?: string;
    author?: string;
    constat?: string;
    content?: string;
    photo?: string;
    category?: string;

    createdAt?: any;
    updatedAt?: any;

    userid?: any;
    _random?: any;

    like?: number;
    dislike?: number;
    likers?: string[];
    dislikers?: string[];
}
