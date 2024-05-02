export interface ProductType {
    id: number;
    name: string;
    price: number;
    url: string;
    volume: number;
    description: string;
    brand: string;
    notes: string;
}

export interface processCheckOutType {
    idProduct: number;
    respon: number
}