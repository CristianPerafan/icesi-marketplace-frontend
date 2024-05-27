import { Icon } from "@iconify/react"
import { SideNavItem } from "./types";
import { SellerRoutes } from "./routes";



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