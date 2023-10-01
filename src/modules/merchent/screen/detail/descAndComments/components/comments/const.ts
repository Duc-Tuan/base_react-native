import { IGeneral } from "types/product-types";

export interface IComments extends IGeneral {
    commentUserId: {
        userImage: string;
        userNickname: string;
    },
    componentContent: string;
}