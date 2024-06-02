export const PublicRoutes = {
    HOME: '/',
    MARKETPLACE: '/marketplace',
    LOGIN: '/login',
    REGISTER: '/register',
}

export const BASE_SELLER_ROUTE = '/sellers';

export const SellerRoutes = {
    BASE : BASE_SELLER_ROUTE,
    PRODUCTS: `${BASE_SELLER_ROUTE}/products`,
    EDIT_PRODUCT: `${BASE_SELLER_ROUTE}/products/:productId`,
    ADD_PRODUCT: `${BASE_SELLER_ROUTE}/products/add`,
}

export const BASE_ADMIN_ROUTE = '/admin';

export const AdminRoutes = {
    USERS: `${BASE_ADMIN_ROUTE}/users`,
    ADD_USER: `${BASE_ADMIN_ROUTE}/users/add`,
    PRODUCTS: `${BASE_ADMIN_ROUTE}/products`,
    EDIT_PRODUCT: `${BASE_ADMIN_ROUTE}/products/:productId`,
}


export const SELLER_ROUTES_LIST = Object.values(SellerRoutes);
