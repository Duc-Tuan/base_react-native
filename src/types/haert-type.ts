import { IGeneral } from './product-types';

/* eslint-disable prettier/prettier */
export interface ResponseHearts extends IHearts {
}

export interface IHearts extends IGeneral {
    heart_content: string[];
}
