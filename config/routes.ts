export const PublicRoutes = {
    HOME: '/',
    MARKETPLACE: '/marketplace',
    LOGIN: '/login',
    REGISTER: '/register',
}

const SellerRoute = '/sellers';

export const SellerRoutes = {
    PRODUCTS: `${SellerRoute}/products`,
}

const AdminRoute = '/admin';

export const AdminRoutes = {
    USERS: `${AdminRoute}/users`,
    PRODUCTS: `${AdminRoute}/products`,
}