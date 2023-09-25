import { IGeneral } from './product-types';

/* eslint-disable prettier/prettier */
export interface ResponseHearts extends IHearts {
}

export interface ResponsePostHearts {
    status?: boolean;
    mess?: string;
}

export interface IHearts extends IGeneral {
    heart_content: string[];
}
