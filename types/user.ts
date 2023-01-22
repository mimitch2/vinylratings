import { VinylRating } from './releases';

export interface User {
    _id: string;
    username: string;
    token: string;
    avatarUrl: string;
    discogsUserId: number;
    releasesRated: number;
    vinylRatings: VinylRating[];
}
