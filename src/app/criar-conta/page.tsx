'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Rotas } from '@/enums/rotas'
import { UsuarioService } from '@/server/usuario'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'
import { toast } from 'sonner'

export default function CriarConta() {
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [mostraSenha, setMostraSenha] = useState(false)

    const router = useRouter()

    const nameInputRef = useRef<HTMLInputElement>(null)
    const userInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null)

    async function handleCreate(e?: FormEvent) {
        if (e) e.preventDefault()

        const nome = name.trim()
        const usuario = user.trim()
        const senha = password.trim()
        const confirmaSenha = confirmPassword.trim()

        if (!nome) {
            toast.warning('Informe seu nome!')
            nameInputRef.current?.focus()
            return
        }

        if (!usuario) {
            toast.warning('Informe um nome de usuário!')
            userInputRef.current?.focus()
            return
        }

        if (!senha) {
            toast.warning('Informe a senha!')
            passwordInputRef.current?.focus()
            return
        }

        if (!confirmaSenha) {
            toast.warning('Confirme sua senha!')
            confirmPasswordInputRef.current?.focus()
            return
        }

        if (confirmaSenha !== senha) {
            toast.warning('Senhas não são iguais!')
            confirmPasswordInputRef.current?.focus()
            return
        }

        setIsLoading(true)

        const payload = {
            nome,
            usuario,
            senha,
        }

        try {
            const criado = await UsuarioService.CreateUsuario(payload)

            if (criado) {
                router.push(Rotas.LOGIN)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="flex w-full h-dvh items-center justify-center bg-gray-50">
            <Card className="w-1/3 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">Os Perdedores</CardTitle>
                    <CardDescription className="text-center">Preencha os dados a baixo para criar seu login</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input
                                id="name"
                                ref={nameInputRef}
                                placeholder="Seu nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>
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
                                type={mostraSenha ? 'text' : 'password'}
                                placeholder="Sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmpassword">Confirme a senha</Label>
                            <Input
                                id="confirmpassword"
                                ref={confirmPasswordInputRef}
                                type={mostraSenha ? 'text' : 'password'}
                                placeholder="Sua senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Checkbox onCheckedChange={(val) => setMostraSenha(Boolean(val.valueOf))} checked={mostraSenha} />
                        <Button type="submit" className="w-full hover:cursor-pointer" disabled={isLoading}>
                            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
