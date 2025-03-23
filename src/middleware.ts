import { Rotas } from '@/enums/rotas'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CookieNameENUM } from '@/enums/cookieName'
import { userDTO } from './dto/login.dto'
import { tipoUsuario } from './enums/tipoUsuario'

export function middleware(request: NextRequest) {
    const cookieToken = request.cookies.get(CookieNameENUM.TOKEN)?.value
    const cookieUser = request.cookies.get(CookieNameENUM.USER)?.value
    const caminhoAtual = request.nextUrl.pathname
    const rotasProtegidas = ['/admin']

    // se não tiver token ou usuário nos cookies volta para o login
    if (!cookieUser || !cookieToken) {
        return NextResponse.redirect(new URL(Rotas.LOGIN, request.url))
    }

    //se tiver o cookies do usuário faz o parser para o tipo userDTO
    const usuario = JSON.parse(cookieUser) as userDTO

    // Verifica se a rota atual precisa de proteção extra
    const precisaDeProtecao = rotasProtegidas.some((rota) => caminhoAtual.startsWith(rota))

    // se precisar de proteção extra como rotas apenas para admins
    if (precisaDeProtecao) {
        // se o tipo do usuário ADMIN permite ele acessar as rotas admin caso contrario redireciona para a home
        if (usuario.tipo === tipoUsuario.ADMIN) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL(Rotas.HOME, request.url))
        }
    }

    return NextResponse.next()
}

// vai verificar apenas as rotas que forem compativeis com as selecionadas
export const config = {
    matcher: ['/os-perdedores/:path*', '/admin/:path*'],
}
