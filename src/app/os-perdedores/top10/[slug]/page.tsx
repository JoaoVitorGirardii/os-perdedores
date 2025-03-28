'use client'
import { Loading } from '@/components/loading'
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
    const [configPage, setConfigPage] = useState({
        titulo: '',
        mulheres: false,
        homens: false,
    })
    const [loading, setLoading] = useState(false)
    const { slug } = use(params)

    async function getItens() {
        try {
            setLoading(true)
            const data = await ItemPerdidoService.TopDez(slug)
            setListItens(data)
        } finally {
            setLoading(false)
        }
    }

    function getConfigVisualizacao() {
        switch (slug) {
            case ListaTopDez.TOP_DEZ_PERDEDORES:
                setConfigPage({ ...configPage, titulo: 'Perdedores' })
                break
            case ListaTopDez.ITENS_MAIS_PERDIDOS_HOMEM:
                setConfigPage({ ...configPage, titulo: 'Itens que homens mais perdem', homens: true })
                break
            case ListaTopDez.ITENS_MAIS_PERDIDOS_MULHERES:
                setConfigPage({ ...configPage, titulo: 'Itens que as mulheres mais perdem', mulheres: true })
                break
            case ListaTopDez.ITENS_MAIS_PERDIDOS_MES:
                setConfigPage({ ...configPage, titulo: 'Itens mais perdidos do mês', homens: true, mulheres: true })
                break
            case ListaTopDez.ITENS_MAIS_PERDIDOS_SEMANA:
                setConfigPage({ ...configPage, titulo: 'Itens mais perdidos da semana', homens: true, mulheres: true })
                break
            case ListaTopDez.ITENS_MAIS_PERDIDOS:
                setConfigPage({ ...configPage, titulo: 'Itens mais perdidos', homens: true, mulheres: true })
                break
            default:
                setConfigPage({ ...configPage, titulo: '' })
                break
        }
    }

    useEffect(() => {
        getItens()
        getConfigVisualizacao()
    }, [])

    return (
        <div className="px-8 py-4 w-full">
            <Loading isLoading={loading} />

            <h1 className="text-3xl font-bold">TOP 10</h1>
            <h2 className="mb-2">{configPage.titulo}</h2>

            <Card className="w-full">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] text-center">Posição</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            {configPage.homens && <TableHead className="text-right">Qtd Homens</TableHead>}
                            {configPage.mulheres && <TableHead className="text-right">Qtd Mulheres</TableHead>}
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
                                {configPage.homens && <TableCell className="text-right">{item.totalMasculino}</TableCell>}
                                {configPage.mulheres && <TableCell className="text-right">{item.totalFeminino}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
