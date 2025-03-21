import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trophy, Medal, Award } from 'lucide-react'

export default function Top10Page() {
    return (
        <div className="p-8 w-full">
            <h1 className="text-3xl font-bold mb-6">TOP 10 Entre as mulheres</h1>

            <Card className="w-full">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] text-center">Posição</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="text-right">Qtd Mulheres</TableHead>
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
                                <TableCell className="text-right">{item.mulheres}</TableCell>
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
        quantidade: 1250,
        valor: 45750.8,
        mulheres: 850,
    },
    {
        nome: 'Tênis',
        quantidade: 1180,
        valor: 42300.5,
        mulheres: 680,
    },
    {
        nome: 'Meia',
        quantidade: 1050,
        valor: 38600.25,
        mulheres: 620,
    },
    {
        nome: 'Anel',
        quantidade: 980,
        valor: 35200.75,
        mulheres: 540,
    },
    {
        nome: 'relógio',
        quantidade: 920,
        valor: 33450.3,
        mulheres: 500,
    },
    {
        nome: 'celular',
        quantidade: 870,
        valor: 31200.6,
        mulheres: 470,
    },
    {
        nome: 'Cadeira',
        quantidade: 820,
        valor: 29800.4,
        mulheres: 450,
    },
    {
        nome: 'Carro',
        quantidade: 780,
        valor: 28100.9,
        mulheres: 420,
    },
    {
        nome: 'Outros - Móveis',
        quantidade: 740,
        valor: 26500.2,
        mulheres: 400,
    },
    {
        nome: 'Outros - Madeira',
        quantidade: 700,
        valor: 25200.1,
        mulheres: 380,
    },
]
