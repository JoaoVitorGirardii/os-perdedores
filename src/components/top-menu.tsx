'use client'

import { Rotas } from '@/enums/rotas'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown, CircleUserRound, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getCookie, removerCookie } from '@/lib/cookies'
import { CookieNameENUM } from '@/enums/cookieName'
import { userDTO } from '@/dto/login.dto'
import { useEffect, useState } from 'react'

export function TopMenu() {
    const router = useRouter()

    // Add client-side only rendering
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Only render the menu on the client
    if (!isClient) {
        return null // Return null or a simple placeholder during SSR
    }

    const user = JSON.parse(getCookie(CookieNameENUM.USER) || '{}') as userDTO

    function logOut() {
        removerCookie(CookieNameENUM.TOKEN)
        removerCookie(CookieNameENUM.USER)
        router.push(Rotas.LOGIN)
    }

    const menus = [
        { label: 'Home', href: Rotas.HOME },
        { label: 'Itens Perdidos', href: Rotas.ITENS_PERDIDOS },
        {
            label: 'Top 10',
            submenus: [
                { label: 'Maiores perdedores', href: Rotas.TOP10_PERDEDORES, disabled: false },
                { label: 'Itens mais perdidos', href: Rotas.TOP10_ITENS_MAIS_PERDIDOS, disabled: false },
                { label: 'Itens mais perdidos HOMENS', href: Rotas.TOP10_MAIS_PERDIDO_HOMENS, disabled: false },
                { label: 'Itens mais perdidos MULHERES', href: Rotas.TOP10_MAIS_PERDIDO_MULHERES, disabled: false },
                { label: 'Da semana', href: Rotas.TOP10_MAIS_PERDIDO_SEMANA, disabled: true },
                { label: 'Do mês', href: Rotas.TOP10_MAIS_PERDIDO_MES, disabled: true },
            ],
        },
        { label: 'Cadastro de item', href: Rotas.CADASTRO_ITENS },
        {
            label: 'Admin',
            permission: ['ADMIN'],
            submenus: [
                { label: 'Cadastro de usuário', href: Rotas.CADASTRO_USUARIO, disabled: false },
                { label: 'Lista de usuário', href: Rotas.LISTA_USUARIOS, disabled: false },
            ],
        },
    ]

    const menusLiberados = menus.filter((menu) => !menu.permission || menu.permission.includes(user.tipo))

    return (
        <div className="flex items-center bg-sidebar-primary text-gray-100 rounded-b-full p-2 px-10 relative z-60 justify-between">
            <nav className="flex items-center space-x-4">
                {menusLiberados.map((menu, index) => {
                    if (menu.submenus) {
                        return (
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
                                            <Button
                                                variant={'ghost'}
                                                disabled={submenu.disabled}
                                                onClick={() => router.push(submenu.href)}
                                                className="cursor-pointer hover:bg-sidebar-accent focus:bg-sidebar-accent w-full justify-start"
                                            >
                                                {submenu.label}
                                            </Button>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                    }

                    return (
                        <Button
                            key={index}
                            variant={'ghost'}
                            onClick={() => router.push(menu.href)}
                            className="cursor-pointer hover:bg-sidebar-accent focus:bg-sidebar-accent"
                        >
                            {menu.label}
                        </Button>
                    )
                })}
            </nav>
            <nav>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <CircleUserRound className="h-7 w-7 hover:cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2">
                        <div className="p-2 text-sm">{user.nome}</div>
                        <DropdownMenuItem asChild>
                            <Button
                                variant={'ghost'}
                                className="cursor-pointer hover:bg-sidebar-accent focus:bg-sidebar-accent w-full justify-start mb-1"
                            >
                                outro menu
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Button
                                variant={'destructive'}
                                onClick={logOut}
                                className="cursor-pointer hover:bg-sidebar-accent focus:bg-sidebar-accent w-full justify-start group"
                            >
                                <LogOut className="text-white group-hover:text-black transition-colors" />
                                Sair
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
    )
}
