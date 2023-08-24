/* eslint-disable prettier/prettier */
export interface ResponseDetailProductGroup {
    productGroup: ProductGroup;
}

export interface ResponseProductGroup {
    metadata: Metadata;
    productGroups: ProductGroup[];
}
export interface ResponseCustomerGroup {
    metadata: Metadata;
    customerGroups: ProductGroup[];
}

export interface DetailCustomerGroup {
    customerGroup: ProductGroup;
}

export interface ResponseProducts {
    metadata: Metadata;
    products: Product[];
}
export interface ResponseProductsSample {
    metadata: Metadata;
    products: ProductSample[];
}

export interface ProductSample {
    id: number;
    code: string;
    name: string;
    element: string;
    content: string;
    unit: string;
    packing: string;
    manufacturer: string;
    registration_no: string;
    manufacturer_country: string;
}

export interface Metadata {
    page: number;
    limit: number;
    total: number;
}

export interface Product {
    id: number;
    storeId: number;
    sku: string;
    barcode: string;
    name: string;
    unit?: string;
    image: string;
    description: any;
    price: number;
    isCombo?: boolean;
    status: string;
    attributes: Attributes;
    packsizes: Packsize[];
    productPacksizes: Packsize[];
    inventories: Inventory[];
    productInventories: Inventory[];
    createdAt: number;
    updatedAt: number;
    iscStatus?: string;
    iscProductMappings: IscProductMapping[];
    combos: Combo[];
    isParacel: boolean;
    paracels: Paracel[];
    productGroup: ProductGroup;
    productName?: string;
    // tagAttachs: SettingType.Tag[];
    orderTaxPercent?: number;
    purchaseOrderTaxPercent?: number;
}

export interface Paracel {
    id: number;
    productId: number;
    factoryDate: string | number;
    stockAdjustmentLineItemId: number;
    expDate: string | number;
    code: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    isNew?: boolean;
    stock?: number;
    mac?: number;
    locationId: number;
    paracelId: number | string;
    quantity?: number | string;
    isWarning?: boolean;
    realStock?: number | string;
    systemStock?: number;
    oldId?: number | string;
    initStock?: number | string;
    paracelStatus: string;
    locationName: string;
}

export interface ResponseIventoryParacel {
    inventories: Paracel[];
}

export interface ProductGroup {
    id: number;
    storeId: number;
    code: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface IscProductMapping {
    locationId: number;
    productId: number;
    storeId: number;
    status: string;
    message: string;
    state: boolean;
    iscId: string;
    iscStatus: string;
    name: string;
    code: string;
    businessRegistrationCertificate: string;
    activeElement: string;
    content: string;
    packing: string;
    manufacturer: string;
    instructions: string;
    contraindication: string;
    description: string;
    country: string;
    imagePath: string;
    unit: string;
    quantity: number;
    groupId: number;
    price: number;
    currency: string;
}

export interface Combo {
    id: number;
    productId: number;
    itemId: number;
    item: Product;
    packsizeId: number;
    packsizeName: string;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export interface Attributes {
    [key: string]: string;
}

export interface Packsize {
    id: number;
    productId: number;
    root: boolean;
    name: string;
    quantity: number | string;
    price: number | string;
    createdAt: number;
    updatedAt: number;
    packsizePrices: PacksizePrice[];
}

export interface PacksizePrice {
    createdAt?: number;
    updatedAt?: number;
    id?: number;
    priceListId: number;
    priceListName: string;
    price: number;
    isPriceListAdvance: boolean;
    root?: boolean;
}

export interface Inventory {
    id: number;
    productId: number;
    mac: number | string;
    stock: number | string;
    max: number | string;
    min: number | string;
    shelfLocated: string;
    location: Location;
    inventoryLocation: Location;
    createdAt: number;
    updatedAt: number;
    locationId?: string | number;
    locationName?: string;
}

export interface Location {
    id: number;
    storeId: number;
    code: string;
    name: string;
    email: any;
    phone: any;
    address: any;
    cityId: any;
    cityName: any;
    districtId: any;
    districtName: any;
    wardId: any;
    wardName: any;
    defaultLocation: boolean;
    status: string;
    createdAt: number;
    updatedAt: number;
}

export type ItemCart = Product & {
    productId: number | undefined;
    name: string | undefined;
    unit: string;
    price: number | string;
    mac: number | string;
    quantity: string | number;
    discountRate: number;
    discountValue: string | number;
    note: string;
    packSelected: Packsize | undefined;
    isRate: boolean;
    discount?: number | string;
    subTotal?: number | string;
    isWarning?: boolean;
    stock?: number | string;
    oldId?: number | string;
    key: string;
    paracelItems?: Partial<Paracel>[];
    isNotInPricelist?: boolean;
};

export interface DevicePrinting {
    address: string;
    name: string;
}

export interface Attribute {
    name: string;
    value: string;
    noEdit?: boolean;
}

export interface CreateProduct {
    name: string;
    sku: string;
    barcode: string;
    unit: string;
    image: string;
    description: string;
    price: number | string;
    attributes: Attribute[];
    packsizes: Partial<Packsize>[];
    inventories: Partial<Inventory>[];
    combo?: Partial<Combo>[];
    paracels?: Partial<Paracel>[];
    productGroupId?: number | string;
    orderTaxPercent?: number;
    purchaseOrderTaxPercent?: number;
}

// export interface PropsCreateProduct {
//     tabLabel?: string;
//     values: CreateProduct;
//     touched: FormikTouched<CreateProduct>;
//     errors: FormikErrors<CreateProduct>;
//     handleChange: {
//         (e: React.ChangeEvent<any>): void;
//         <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
//             ? void
//             : (e: string | React.ChangeEvent<any>) => void;
//     };
//     handleBlur: {
//         (e: React.FocusEvent<any, Element>): void;
//         <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
//     };
//     setFieldValue: (
//         field: string,
//         value: any,
//         shouldValidate?: boolean | undefined,
//     ) => Promise<void> | Promise<FormikErrors<CreateProduct>>;
//     setValues: (
//         values: React.SetStateAction<CreateProduct>,
//         shouldValidate?: boolean | undefined,
//     ) => Promise<void> | Promise<FormikErrors<CreateProduct>>;

//     isCombo?: boolean;
//     productId?: string | number;
//     onRefresh?: () => void;
//     isParacel?: boolean;
//     item?: Product;
// }

export interface ResponseDetailProduct {
    product: Product;
}

export interface ResponseProductParacel {
    metadata: Metadata;
    productParacels: ProductParacel[];
}

export interface ProductParacel {
    id: number;
    productId: number;
    sku: string;
    productName: string;
    factoryDate: number;
    expDate: number;
    code: string;
    status: string;
    createdAt: number;
    updatedAt: number;
    expired: string;
    unit: string;
}