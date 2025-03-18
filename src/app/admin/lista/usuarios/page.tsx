'use client'
import { Loading } from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UsuarioDTO } from '@/dto/usuario.dto'
import { UsuarioService } from '@/server/usuario'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function getUsuarios() {
        const users = await UsuarioService.GetUsuarios()
        setUsuarios(users)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getUsuarios()
    }, [])

    return (
        <div className="p-8 w-full">
            <Loading isLoading={loading} />

            <h1 className="text-3xl font-bold mb-6">Usuários</h1>

            <Card className="w-full">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[90px] text-center">NRº</TableHead>
                            <TableHead className="w-[300px] text-left">ID</TableHead>
                            <TableHead className="text-left">Nome</TableHead>
                            <TableHead className="text-center">Tipo</TableHead>
                            <TableHead className="text-left">Ativo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usuarios.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-left">{item.id}</TableCell>
                                <TableCell className="text-left">{item.nome}</TableCell>
                                <TableCell className="text-center">
                                    {item.tipo === 'ADMIN' ? (
                                        <Badge className="bg-red-500 hover:bg-red-600 gap-1">{item.tipo}</Badge>
                                    ) : (
                                        <Badge className="bg-green-500 hover:bg-green-600 gap-1">{item.tipo}</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">{item?.ativo ? <Check className="text-green-600" /> : null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
