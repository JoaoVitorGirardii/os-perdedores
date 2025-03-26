'use client'

import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { tipoUsuario } from '@/enums/tipoUsuario'
import { UsuarioService } from '@/server/usuario'
import { ChangeEvent, useState } from 'react'

export default function CadastroUsuario() {
    const [nome, setNome] = useState('')
    const [usuario, setUsuario] = useState('')
    const [loadingCreate, setLoadingCreate] = useState<boolean>(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setLoadingCreate(true)
            await UsuarioService.CreateAdmin({ nome, usuario })
            clear()
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingCreate(false)
        }
    }

    function clear() {
        setNome('')
        setUsuario(tipoUsuario.ADMIN)
    }

    return (
        <main className="flex flex-col gap-4 p-8">
            <Loading isLoading={loadingCreate} msgLoadin="Cadastrando usuário" />
            <h1 className="font-bold text-3xl">Cadastro de usuário admin</h1>
            <div className="flex justify-center w-full">
                <Card className="w-full p-4">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <label className="w-full">
                                <span>Nome</span>
                                <Input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setNome(event.target.value)} />
                            </label>
                            <label className="w-full">
                                <span>Usuário</span>
                                <Input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setUsuario(event.target.value)} />
                            </label>
                        </div>

                        <div className="flex justify-center">
                            <Button className="min-w-xl hover:cursor-pointer" type="submit">
                                Cadastrar
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </main>
    )
}
