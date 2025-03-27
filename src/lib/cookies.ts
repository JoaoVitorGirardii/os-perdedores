import { userDTO } from '@/dto/login.dto'
import { CookieNameENUM } from '@/enums/cookieName'
import Cookies from 'js-cookie'

export function salvarCookie(nome: string, valor: string) {
    Cookies.set(nome, valor, { expires: 10, secure: true }) // Expires em 10 dia
}

export function getCookie(nome: string) {
    const token = Cookies.get(nome)
    return token
}

export function removerCookie(nome: string) {
    Cookies.remove(nome)
}

export function getUsuario(): userDTO {
    const user = Cookies.get(CookieNameENUM.USER)

    return JSON.parse(user || '{}') as userDTO
}
