import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";

import NextLink from "next/link";
import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";




export const Navigationbar = () => { 


    return(
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="text-lg  font-bold text-inherit">Icesi Marketplace</p>
					</NextLink>
				</NavbarBrand>

				<ul className="hidden lg:flex gap-4 justify-end ml-20">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
			</ul>
            </NavbarContent>



    
        </NextUINavbar>

    )

};