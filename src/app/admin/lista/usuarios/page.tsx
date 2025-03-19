'use client'
import { Loading } from '@/components/loading'
import { MsgDefaultTabelaVazia } from '@/components/msg-default-tabela-vazia'
import { TablePagination } from '@/components/tablePagination'
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

    // paginacao
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [indexItens, setIndexItens] = useState(0)

    async function getUsuarios() {
        const offSet = (currentPage - 1) * itemsPerPage

        const users = await UsuarioService.GetUsuarios({ offSet, limit: itemsPerPage })
        if (users) {
            setUsuarios(users?.data)
            setTotal(users.total)
        }
        setLoading(false)
        setIndexItens(offSet + 1)
    }

    useEffect(() => {
        setLoading(true)
        getUsuarios()
    }, [currentPage, itemsPerPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1)
    }

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
                                <TableCell className="text-center">{index + indexItens}</TableCell>
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
                {usuarios.length === 0 && <MsgDefaultTabelaVazia />}
                {usuarios.length !== 0 && (
                    <TablePagination
                        currentPage={currentPage}
                        totalItems={total}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                )}
            </Card>
        </div>
    )
}
