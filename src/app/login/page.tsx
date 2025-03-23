'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Rotas } from '@/enums/rotas'
import { UsuarioService } from '@/server/usuario'
import { useState, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { salvarCookie } from '@/lib/cookies'
import { CookieNameENUM } from '@/enums/cookieName'
import { toast } from 'sonner'

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const userInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    async function handleLogin(e?: FormEvent) {
        if (e) e.preventDefault()

        const usuario = user.trim()
        const senha = password.trim()

        if (!usuario) {
            toast.warning('Informe um usuário para logar!')
            userInputRef.current?.focus()
            return
        }

        if (!senha) {
            toast.warning('Informe a senha!')
            passwordInputRef.current?.focus()
            return
        }

        setIsLoading(true)

        const payload = {
            usuario,
            senha,
        }

        try {
            const login = await UsuarioService.Login(payload)

            if (login?.token) {
                salvarCookie(CookieNameENUM.TOKEN, login.token)
                salvarCookie(CookieNameENUM.USER, JSON.stringify(login.user))
                router.push(Rotas.HOME)
            } else {
                passwordInputRef.current?.focus()
            }
        } catch (error) {
            console.error(error)
            passwordInputRef.current?.focus()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex w-full h-dvh items-center justify-center bg-gray-50">
            <Card className="w-96 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">Os Perdedores</CardTitle>
                    <CardDescription className="text-center">Entre com suas credenciais</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuário</Label>
                            <Input
                                id="username"
                                ref={userInputRef}
                                placeholder="Seu nome de usuário"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                ref={passwordInputRef}
                                type="password"
                                placeholder="Sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full hover:cursor-pointer" disabled={isLoading}>
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
