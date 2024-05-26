import { Icon } from "@iconify/react"
import { SideNavItem } from "./types";


export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Inicio',
        path: '/',
        icon: <Icon icon="lucide:home" width="24" height="24"/>,
    },{
        title: 'productos',
        path: '/productos',
        icon: <Icon icon="lucide:box" width="24" height="24"/>,
        submenu: true,
        subMenuItems: [
            {
                title: 'Todos',
                path: '/productos',
            },
            {
                title: 'Agregar',
                path: '/productos/agregar',
            }
        ]
        
    }
]