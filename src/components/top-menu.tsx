import { Rotas } from '@/enums/rotas'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

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
        { label: 'Cadastro de item', href: Rotas.CADASTRO_ITENS },
        { label: 'Cadastro de usuário', href: Rotas.CADASTRO_USUARIO },
        {
            label: 'Admin',
            submenus: [
                { label: 'Cadastro de usuário', href: Rotas.CADASTRO_USUARIO },
                { label: 'Lista de usuário', href: Rotas.LISTA_USUARIOS },
            ],
        },
    ]

    return (
        <div className="flex items-center bg-sidebar-primary text-gray-100 rounded-b-full p-2 px-10 relative z-60">
            <nav className="flex items-center space-x-4">
                {menus.map((menu, index) =>
                    menu.submenus ? (
                        <DropdownMenu key={index}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="text-gray-100 hover:text-gray-900 hover:bg-sidebar-accent flex items-center gap-1 hover:cursor-pointer"
                                >
                                    {menu.label}
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-2">
                                {menu.submenus.map((submenu, subIndex) => (
                                    <DropdownMenuItem key={subIndex} asChild>
                                        <Link
                                            href={submenu.href}
                                            className="cursor-pointer hover:bg-sidebar-accent focus:bg-sidebar-accent"
                                        >
                                            {submenu.label}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            key={index}
                            href={menu.href}
                            className={cn(
                                'text-gray-100 hover:text-gray-900 px-3 py-2 rounded-md',
                                'hover:bg-sidebar-accent transition-colors',
                            )}
                        >
                            {menu.label}
                        </Link>
                    ),
                )}
            </nav>
        </div>
    )
}
