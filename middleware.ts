import NextAuth from "next-auth";
import authConfig from "@/auth.config";
const { auth } = NextAuth(authConfig);
import { PUBLIC_ROUTES,AUTH_ROUTES,BUYER_ROUTES,ADMIN_ROUTES} from "@/routes";
import { NOT_AUTHORIZED_DEFAULT_REDIRECT,DEFAULT_REDIRECT } from "@/routes";
import { SELLER_ROUTES_LIST } from "./config/routes";

export default auth((req) => {
    

    const { nextUrl } = req;
    const pathname = nextUrl.pathname;
  
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user?.roles.includes("admin");
    const isBuyer = req.auth?.user?.roles.includes("buyer");
    const isSeller = req.auth?.user?.roles.includes("seller");

    const redirectTo = (path: string) => Response.redirect(new URL(path, nextUrl));

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isBuyerRoute = BUYER_ROUTES.includes(pathname);
    const isSellerRoute = SELLER_ROUTES_LIST.some(route => {
        const normalizedRoute = route.replace(/:\w+/g, '[^/]+');
        const regex = new RegExp(`^${normalizedRoute}$`);
        return regex.test(pathname);
    });
    const isAdminRoute = ADMIN_ROUTES.includes(pathname);

    /*
        if the route is public, do nothing
    */
    if (isPublicRoute) {
        return;
    }


    
    if (isAuthRoute) {
        if (isLoggedIn) return redirectTo(DEFAULT_REDIRECT);
        return;
    }

    /*
        if the user is not logged in, redirect to the login route.
        include the current path as a callback url to redirect to after login
    */

    if (!isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) callbackUrl += nextUrl.search;
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return redirectTo(`/login?callbackUrl=${encodedCallbackUrl}`);
    }

    // if the user is logged in, is a buyer, but not a buyer route, redirect to the error page


    // if the user is logged in, but not a buyer, redirect to the error page
    if (!isBuyer && isBuyerRoute) {
        nextUrl.searchParams.set("error", "Access Denied");
        nextUrl.pathname = "/error";
        return Response.redirect(new URL(nextUrl));
    }


    // if the user is logged in, but not a seller, redirect to the error page
    if (!isSeller && isSellerRoute) {
        nextUrl.searchParams.set("error", "Access Denied");
        nextUrl.pathname = "/error";
      
        return Response.redirect(new URL(nextUrl));
    }



    // if the user is logged in, but not an admin, redirect to the error page
    if (!isAdmin && isAdminRoute) {
        nextUrl.searchParams.set("error", "Access Denied");
        nextUrl.pathname = "/error";
        return Response.redirect(new URL(nextUrl));
    }
    
    return;
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};