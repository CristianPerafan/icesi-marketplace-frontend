import { Icon } from "@iconify/react"
import { SideNavItem } from "./types";
import { AdminRoutes, SellerRoutes } from "./routes";
import { ADMIN_ROUTES } from "@/routes";



export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Inicio',
        path: '/',
        icon: <Icon icon="lucide:home" width="24" height="24"/>,
    },{
        title: 'Productos',
        path: SellerRoutes.PRODUCTS,
        icon: <Icon icon="lucide:box" width="24" height="24"/>,
        submenu: true,
        subMenuItems: [
            {
                title: 'Listar',
                path:  SellerRoutes.PRODUCTS,
            },
            {
                title: 'Agregar',
                path: '/productos/agregar',
            }
        ]
        
    }
]

export const SIDENAV_ITEMS_ADMIN: SideNavItem[] = [
    {
        title: 'Inicio',
        path: '/',
        icon: <Icon icon="lucide:home" width="24" height="24"/>,
    },{
        title: 'Productos',
        path: AdminRoutes.PRODUCTS,
        icon: <Icon icon="lucide:box" width="24" height="24"/>,
        submenu: true,
        subMenuItems: [
            {
                title: 'Listar',
                path:  AdminRoutes.PRODUCTS,
            },
        ]
        
    },{
        title: 'Usuarios',
        path: AdminRoutes.USERS,
        icon: <Icon icon="lucide:user" width="24" height="24"/>,
        submenu: true,
        subMenuItems: [
            {
                title: 'Listar',
                path:  AdminRoutes.USERS,
            },
            {
                title: 'Agregar',
                path: AdminRoutes.ADD_USER,
            }
        ]
    },{
        title: "Órdenes",
        path: AdminRoutes.ORDERS,
        icon: <Icon icon="lucide:shopping-cart" width="24" height="24"/>,
    }

]
