'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Rotas } from '@/enums/rotas'
import { UsuarioService } from '@/server/usuario'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { salvarCookie } from '@/lib/cookies'
import { CookieNameENUM } from '@/enums/cookieName'

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    async function handleLogin() {
        const payload = {
            usuario: user,
            senha: password,
        }

        try {
            const login = await UsuarioService.Login(payload)

            if (login?.token) {
                salvarCookie(CookieNameENUM.TOKEN, login.token)
                salvarCookie(CookieNameENUM.USER, JSON.stringify(login.user))
                router.push(Rotas.HOME)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex w-full h-dvh items-center justify-center">
            <Card className="w-80 p-4">
                <h1>Login</h1>
                <Input placeholder="Usuário" onChange={(e) => setUser(e.currentTarget.value)} />
                <Input placeholder="Senha" onChange={(e) => setPassword(e.currentTarget.value)} />
                <Button onClick={handleLogin}>Entrar</Button>
                <Link href={Rotas.HOME}>Entrar</Link>
            </Card>
        </div>
    )
}
