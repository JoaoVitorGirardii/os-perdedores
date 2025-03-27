'use client'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TopDezDTO } from '@/dto/response/topDez.dto'
import { ListaTopDez } from '@/enums/listaTopDez'
import { ItemPerdidoService } from '@/server/itemPerdido'
import { Trophy, Medal, Award } from 'lucide-react'
import { use, useEffect, useState } from 'react'

export default function PageListaTopDez({ params }: { params: Promise<{ slug: ListaTopDez }> }) {
    const [listItens, setListItens] = useState<TopDezDTO | null>()
    const { slug } = use(params)
    const [tituloPagina, setTituloPagina] = useState('')

    async function getItens() {
        const data = await ItemPerdidoService.TopDez(slug)
        setListItens(data)
    }

    function getTituloTopDez() {
        switch (slug) {
            case ListaTopDez.ITENS_MAIS_PERDIDOS_HOMEM:
                return 'Itens que homens mais perdem'
            case ListaTopDez.ITENS_MAIS_PERDIDOS_MULHERES:
                return 'Itens que as mulheres mais perdem'
            case ListaTopDez.ITENS_MAIS_PERDIDOS_MES:
                return 'Itens mais perdidos do mês'
            case ListaTopDez.ITENS_MAIS_PERDIDOS_SEMANA:
                return 'Itens mais perdidos da semana'
            case ListaTopDez.ITENS_MAIS_PERDIDOS:
                return 'Itens mais perdidos'
            default:
                return ''
        }
    }

    useEffect(() => {
        getItens()
        setTituloPagina(getTituloTopDez())
    }, [])

    return (
        <div className="p-8 w-full">
            <h1 className="text-3xl font-bold">TOP 10</h1>
            <h2 className="mb-6">{tituloPagina}</h2>

            <Card className="w-full">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] text-center">Posição</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="text-right">Qtd Homens</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listItens?.itens?.map((item, index) => (
                            <TableRow key={index} className={index < 3 ? 'bg-muted/50' : ''}>
                                <TableCell className="text-center">
                                    {index === 0 ? (
                                        <Badge className="bg-yellow-500 hover:bg-yellow-600 gap-1">
                                            <Trophy className="h-4 w-4" />
                                            1º
                                        </Badge>
                                    ) : index === 1 ? (
                                        <Badge className="bg-gray-400 hover:bg-gray-500 gap-1">
                                            <Medal className="h-4 w-4" />
                                            2º
                                        </Badge>
                                    ) : index === 2 ? (
                                        <Badge className="bg-amber-600 hover:bg-amber-700 gap-1">
                                            <Award className="h-4 w-4" />
                                            3º
                                        </Badge>
                                    ) : (
                                        <span>{index + 1}º</span>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{item.nomeItem}</TableCell>
                                <TableCell className="text-right">{item.quantidade}</TableCell>
                                <TableCell className="text-right">
                                    R$ {item.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </TableCell>
                                <TableCell className="text-right">{item.totalMasculino}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
