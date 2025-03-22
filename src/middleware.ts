import { Rotas } from '@/enums/rotas'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CookieNameENUM } from '@/enums/cookieName'
import { userDTO } from './dto/login.dto'
import { tipoUsuario } from './enums/tipoUsuario'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get(CookieNameENUM.TOKEN)?.value
    const usuario = JSON.parse(request.cookies.get(CookieNameENUM.USER)?.value || '') as userDTO

    const caminhoAtual = request.nextUrl.pathname
    const rotasProtegidas = ['/admin']

    if (!token) {
        return NextResponse.redirect(new URL(Rotas.LOGIN, request.url))
    }

    // Verifica se a rota atual precisa de proteção extra
    const precisaDeProtecao = rotasProtegidas.some((rota) => caminhoAtual.startsWith(rota))

    if (precisaDeProtecao) {
        if (usuario.tipo === tipoUsuario.ADMIN) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL(Rotas.HOME, request.url))
        }
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/os-perdedores/:path*', '/admin/:path*'],
}
