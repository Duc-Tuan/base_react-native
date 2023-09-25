export class CartsContructor {
    _id: string | number;
    productId: string | number;
    productimage: string;
    code: string;
    productname: string;
    productprice: number;
    productpromotion: number;

    constructor(
        _id: string | number,
        code: string,
        productId: string | number,
        productimage: string,
        productname: string,
        productprice: number,
        productpromotion: number
    ) {
        this._id = _id;
        this.code = code;
        this.productId = productId;
        this.productimage = productimage;
        this.productname = productname;
        this.productprice = productprice;
        this.productpromotion = productpromotion;

    }

    data() {
        const reslut = {
            _id: this._id,
            code: this.code,
            productId: this.productId,
            productimage: this.productimage,
            productname: this.productname,
            qty: 1,
            productprice: this.productprice,
            productpromotion: this.productpromotion,
        };
        return reslut;
    }
}