'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn, converteValorStringEmNumero, formataValorInput } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { ptBR } from 'date-fns/locale'
import { CategoriaServer } from '@/server/categoria'
import { CategoriaDTO } from '@/dto/categoria.dto'
import { ItemPerdidoService } from '@/server/itemPerdido'
import { ItemPerdidoDTO } from '@/dto/itemPerdido.dto'
import { toast } from 'sonner'

export default function ItemPerdidoCadastro() {
    const [date, setDate] = useState<Date>()
    const [valor, setValor] = useState<string>()
    const [categoriaId, setCategoriaId] = useState<string>()
    const [nome, setNome] = useState<string>()
    const [descricao, setDescricao] = useState<string>()

    const [categorias, setCategorias] = useState<CategoriaDTO[]>([])

    function formataValor(e: React.ChangeEvent<HTMLInputElement>) {
        const valor = formataValorInput(e)
        setValor(valor)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!date || !valor || !categoriaId || !nome || !descricao || (valor && Number(valor) === 0)) {
            toast.error('Preencha todos os campos')
            return
        }

        const payload: ItemPerdidoDTO = {
            dataPerca: date,
            valor: converteValorStringEmNumero(valor),
            categoriaId,
            nome,
            descricao,
            usuarioId: '80985c76-9558-4b3a-ae76-76ed2f52bd7f',
        }

        await ItemPerdidoService.Create(payload)
    }

    async function getCategorias() {
        const resposta = await CategoriaServer.GetCategorias()
        setCategorias(resposta)
    }

    useEffect(() => {
        getCategorias()
    }, [])

    return (
        <main className="flex flex-col gap-4 p-8">
            <h1 className="font-bold text-3xl">Item perdido</h1>
            <div className="flex justify-center w-full">
                <Card className="w-full p-4">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <label className="w-full">
                                <span>Categoria</span>
                                <Select onValueChange={setCategoriaId}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {categorias.map((item) => (
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.descricao}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </label>
                            <label className="w-full">
                                <span>Nome</span>
                                <Input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setNome(event.target.value)} />
                            </label>
                            <label className="w-full">
                                <span>Valor(R$)</span>
                                <Input type="text" placeholder="R$0,00" value={valor} onChange={formataValor} />
                            </label>
                        </div>
                        <div>
                            <label className="block">
                                <span>Data da perca</span>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'w-[280px] justify-start text-left font-normal',
                                                    !date && 'text-muted-foreground',
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </label>
                        </div>
                        <label>
                            <span>Descrição</span>
                            <Textarea
                                maxLength={200}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescricao(event.target.value)}
                            />
                        </label>
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
