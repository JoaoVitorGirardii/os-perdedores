'use client'

import { Loading } from '@/components/loading'
import { MsgDefaultTabelaVazia } from '@/components/msg-default-tabela-vazia'
import { TablePagination } from '@/components/tablePagination'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ItensPerdidosUsuarioDTO } from '@/dto/response/itensPerdidoUsuario.dto'
import { getUsuario } from '@/lib/cookies'
import { formataValor } from '@/lib/utils'
import { ItemPerdidoService } from '@/server/itemPerdido'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export default function ItensPerdidosPage() {
    const [itens, setItens] = useState<ItensPerdidosUsuarioDTO | null>()
    const [loading, setLoading] = useState(false)
    const [listaVazia, setListaVazia] = useState(true)

    // paginacao
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [indexItens, setIndexItens] = useState(0)

    // paginação
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    // paginação
    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1)
    }

    const usuarioId = getUsuario().id

    useEffect(() => {
        setLoading(true)
        const offSet = (currentPage - 1) * itemsPerPage
        async function getItens() {
            if (usuarioId) {
                const dados = await ItemPerdidoService.GetItensByUsuarioId({
                    usuarioId,
                    paginacao: { offSet, limit: itemsPerPage },
                })

                if (dados) {
                    setItens(dados.data)
                    setTotal(dados.total)
                }

                if (dados?.data?.itensPerdidos && dados.data?.itensPerdidos.length > 0) {
                    setListaVazia(false)
                } else {
                    setListaVazia(true)
                }

                setLoading(false)
                setIndexItens(offSet + 1)
            }
        }

        getItens()
    }, [currentPage, itemsPerPage, usuarioId])

    return (
        <div className="p-8 w-full">
            <Loading isLoading={loading} />
            <h1 className="text-3xl font-bold mb-6">Meus itens perdidos</h1>

            <Card className="w-full">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] text-center">Posição</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="text-right">Descrição</TableHead>
                            <TableHead className="text-right">Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {itens?.itensPerdidos?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + indexItens}º</TableCell>
                                <TableCell className="font-medium">{item.nome}</TableCell>
                                <TableCell className="text-right">{formataValor(item.valor)}</TableCell>
                                <TableCell className="text-right">{item.descricao}</TableCell>
                                <TableCell className="text-right">{format(item.dataPerca, 'dd/MM/yyyy')}</TableCell>
                            </TableRow>
                        ))}
                        {!listaVazia && (
                            <TableRow>
                                <TableCell className="text-center font-bold"></TableCell>
                                <TableCell className="font-medium"> </TableCell>
                                <TableCell className="text-right font-bold">{formataValor(itens?.totalDeFinanceiro)}</TableCell>
                                <TableCell className="text-right"> </TableCell>
                                <TableCell className="text-right"> </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {listaVazia && <MsgDefaultTabelaVazia />}
                {!listaVazia && (
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
