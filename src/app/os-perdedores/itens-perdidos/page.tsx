import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Award, Medal, Trophy } from 'lucide-react'

export default function ItensPerdidosPage() {
    return (
        <div className="p-8 w-full">
            <h1 className="text-3xl font-bold mb-6">Seus itens perdidos</h1>

            <Card className="w-full">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] text-center">Posição</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="text-right">Descrição</TableHead>
                            <TableHead className="text-right">Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboardData.map((item, index) => (
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
                                <TableCell className="font-medium">{item.nome}</TableCell>
                                <TableCell className="text-right">{item.quantidade}</TableCell>
                                <TableCell className="text-right">
                                    R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </TableCell>
                                <TableCell className="text-right">{item.descricao}</TableCell>
                                <TableCell className="text-right">{item.data}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

const leaderboardData = [
    {
        nome: 'Camisa',
        quantidade: 5,
        valor: 50.8,
        descricao: 'Camisa de manga longa',
        data: '2022-01-01',
    },
    {
        nome: 'Meia',
        quantidade: 3,
        valor: 510.8,
        descricao: 'MEIA DE ALGODÃO',
        data: '2022-01-01',
    },
    {
        nome: 'Granpo de roupa',
        quantidade: 2,
        valor: 50.8,
        descricao: 'Alguém perdeu um grampo de roupa',
        data: '2022-01-01',
    },
    {
        nome: 'Mochila',
        quantidade: 1,
        valor: 250.8,
        descricao: 'Anda perdendo mochila por aí?',
        data: '2022-01-01',
    },
]
