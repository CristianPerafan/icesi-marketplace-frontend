export const PublicRoutes = {
    HOME: '/',
    MARKETPLACE: '/marketplace',
    LOGIN: '/login',
    REGISTER: '/register',
}

export const BASE_SELLER_ROUTE = '/sellers';
export const BASE_BUYER_ROUTE = '/buyers';

export const SellerRoutes = {
    BASE : BASE_SELLER_ROUTE,
    PRODUCTS: `${BASE_SELLER_ROUTE}/products`,
    EDIT_PRODUCT: `${BASE_SELLER_ROUTE}/products/:productId`,
    ADD_PRODUCT: `${BASE_SELLER_ROUTE}/products/add`,
    ORDERS: `${BASE_SELLER_ROUTE}/orders`,
    ORDER_DETAILS: `${BASE_SELLER_ROUTE}/orders/:orderId`,

}

export const BASE_ADMIN_ROUTE = '/admin';

export const AdminRoutes = {
    USERS: `${BASE_ADMIN_ROUTE}/users`,
    ADD_USER: `${BASE_ADMIN_ROUTE}/users/add`,
    PRODUCTS: `${BASE_ADMIN_ROUTE}/products`,
    EDIT_PRODUCT: `${BASE_ADMIN_ROUTE}/products/:productId`,
    READ_ORDER: `${BASE_ADMIN_ROUTE}/orders/:orderId`,
    ORDERS: `${BASE_ADMIN_ROUTE}/orders`,
}

export const BuyerRoutes = {
    BASE : BASE_BUYER_ROUTE,
    PRODUCTS: `${BASE_BUYER_ROUTE}/products`,
    DETAIL_PRODUCT: `${BASE_BUYER_ROUTE}/:productId`,
    STORE: `${BASE_BUYER_ROUTE}/cart`,
}


export const SELLER_ROUTES_LIST = Object.values(SellerRoutes);
