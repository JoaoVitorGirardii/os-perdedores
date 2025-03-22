import Cookies from 'js-cookie'

export function salvarCookie(nome: string, valor: string) {
    Cookies.set(nome, valor, { expires: 10 }) // Expires em 10 dia
}

export function obterCookie(nome: string) {
    const token = Cookies.get(nome)
    return token
}

export function removerCookie(nome: string) {
    Cookies.remove(nome)
}
