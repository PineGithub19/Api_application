export interface IBrand {
    id: number;
    brand_name: string;
}

export interface ICategory {
    id: number;
    category: string;
}

export interface IProducts {
    id: number;
    name: string;
    price: number;
    cate_id: number;
    brand_id: number;
    thumbnail: string;
}

export interface IProductDetail {
    id: number;
    product_id: number;
    description: string;
    warranty: string;
}

export interface IProductDiscount {
    id: number;
    product_id: number;
    discount: number;
}

export interface IProductImages {
    id: number;
    product_id: number;
    image: string;
}

export interface IStores {
    id: number;
    address: string;
    sub_address: string;
}

export interface IProductAttributes {
    id: number;
    product_id: number;
    store_id: number;
    size: number;
    color: string;
    quantity: number;
    price: number;
}

export interface IVouchers {
    id: number;
    voucher_code: string;
    discount_percentage: number;
}

export interface IUsers {
    id: number;
    name: string;
    email: string;
    phone: string;
    province: string;
    district: string;
    commune: string;
    address: string;
    housing_type: string;
}

export interface IOrders {
    id: number;
    user_id: number;
    voucher_id: number;
    total_price: number;
    payment_type: string;
    created_at: string;
}

export interface IOrderItems {
    id: number;
    order_id: number;
    product_attribute_id: number;
    quantity: number;
    price: number;
}

export interface IOrderAddress {
    id: number;
    order_id: number;
    email: string;
    recipient_name: string;
    phone: string;
    province: string;
    district: string;
    commune: string;
    address: string;
    housing_type: string;
}
