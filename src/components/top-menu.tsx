import { Rotas } from '@/enums/rotas'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from './ui/navigation-menu'
import Link from 'next/link'

export function TopMenu() {
    const menus = [
        { label: 'Home', href: Rotas.HOME },
        { label: 'Itens Perdidos', href: Rotas.ITENS_PERDIDOS },
        {
            label: 'Top 10',
            submenus: [
                { label: 'Maiores perdedores', href: Rotas.TOP10_PERDEDORES },
                { label: 'Itens mais perdidos', href: Rotas.TOP10_ITENS_MAIS_PERDIDOS },
                { label: 'Itens mais perdidos HOMENS', href: Rotas.TOP10_MAIS_PERDIDO_HOMENS },
                { label: 'Itens mais perdidos MULHERES', href: Rotas.TOP10_MAIS_PERDIDO_MULHERES },
                { label: 'Da semana', href: Rotas.TOP10_MAIS_PERDIDO_SEMANA },
                { label: 'Do mês', href: Rotas.TOP10_MAIS_PERDIDO_MES },
            ],
        },
        { label: 'Cadastro', href: Rotas.CADASTRO },
    ]

    function renderMenu() {
        return menus.map((menu, index) => (
            <NavigationMenuItem key={index}>
                {menu.submenus ? (
                    <>
                        <NavigationMenuTrigger className="bg-sidebar-primary">{menu.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="w-64">
                                {menu.submenus.map((submenu) => (
                                    <li key={submenu.label}>
                                        <NavigationMenuLink asChild>
                                            <a className="rounded-md no-underline outline-none focus:shadow-md" href={submenu.href}>
                                                <div className="font-medium">{submenu.label}</div>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </>
                ) : (
                    <Link href={menu.href} legacyBehavior passHref>
                        <NavigationMenuLink>{menu.label}</NavigationMenuLink>
                    </Link>
                )}
            </NavigationMenuItem>
        ))
    }

    return (
        <div className="bg-sidebar-primary text-gray-100 rounded-b-full p-2 px-10">
            <NavigationMenu>
                <NavigationMenuList>{renderMenu()}</NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
