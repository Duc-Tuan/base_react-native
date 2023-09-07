/* eslint-disable prettier/prettier */
export interface IMerChant {
    id: string | number;
    code: string;
    index: number;
    merchantName: string;
    merchantAddress: string;
    merchantEmail: string;
    merchantPhone: string;
    merchantTimeOpen: string;
    merchantImage: string;
    createdAt: string;
    updatedAt: string;
    merchantLike: number;
    merchantFollowing: number;
    merchantFeedback: number;
    merchantLocation: any[];
}
