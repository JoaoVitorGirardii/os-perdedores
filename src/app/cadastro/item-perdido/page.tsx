'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn, formataValorInput } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { ptBR } from 'date-fns/locale'

export default function ItemPerdidoCadastro() {
    const [date, setDate] = useState<Date>()
    const [valor, setValor] = useState<string>()
    const [item, setItem] = useState<string>()
    const [nome, setNome] = useState<string>()
    const [descricao, setDescricao] = useState<string>()

    function formataValor(e: React.ChangeEvent<HTMLInputElement>) {
        const valor = formataValorInput(e)
        setValor(valor)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const dataPerca = date ? format(date, 'yyyy-MM-dd') : null
        console.log({ dataPerca, valor, item, nome, descricao })
    }

    return (
        <main className="flex flex-col gap-4 p-8">
            <h1 className="font-bold text-3xl">Item perdido</h1>
            <div className="flex justify-center w-full">
                <Card className="w-full p-4">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <label className="w-full">
                                <span>Item</span>
                                <Select onValueChange={setItem}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um item" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Itens do Dia a Dia</SelectLabel>
                                            <SelectItem value="chave">Chaves</SelectItem>
                                            <SelectItem value="carteira">Carteira</SelectItem>
                                            <SelectItem value="celular">Celular</SelectItem>
                                            <SelectItem value="fones">Fones de ouvido</SelectItem>
                                            <SelectItem value="oculos">Óculos</SelectItem>
                                            <SelectItem value="guarda-chuva">Guarda-chuva</SelectItem>
                                            <SelectItem value="relogio">Relógio</SelectItem>
                                            <SelectItem value="documentos">Documentos</SelectItem>

                                            <SelectLabel>Dispositivos Eletrônicos</SelectLabel>
                                            <SelectItem value="carregador">Carregador</SelectItem>
                                            <SelectItem value="power-bank">Power Bank</SelectItem>
                                            <SelectItem value="controle-remoto">Controle Remoto</SelectItem>
                                            <SelectItem value="pendrive">Pen Drive</SelectItem>
                                            <SelectItem value="cartao-memoria">Cartão de Memória</SelectItem>
                                            <SelectItem value="mouse">Mouse sem fio</SelectItem>
                                            <SelectItem value="tablet">Tablet</SelectItem>

                                            <SelectLabel>Itens de Vestuário</SelectLabel>
                                            <SelectItem value="bone">Boné / Chapéu</SelectItem>
                                            <SelectItem value="casaco">Casaco / Blusa</SelectItem>
                                            <SelectItem value="luvas">Luvas</SelectItem>
                                            <SelectItem value="cachecol">Cachecol</SelectItem>
                                            <SelectItem value="cinto">Cinto</SelectItem>
                                            <SelectItem value="meia">Meias</SelectItem>
                                            <SelectItem value="sapato">Sapatos / Chinelos</SelectItem>

                                            <SelectLabel>Itens de Papelaria e Escritório</SelectLabel>
                                            <SelectItem value="caneta">Canetas</SelectItem>
                                            <SelectItem value="caderno">Cadernos / Agendas</SelectItem>
                                            <SelectItem value="cartao-visita">Cartão de Visita</SelectItem>
                                            <SelectItem value="notas-fiscais">Notas Fiscais</SelectItem>

                                            <SelectLabel>Itens de Viagem</SelectLabel>
                                            <SelectItem value="mala">Malas e Mochilas</SelectItem>
                                            <SelectItem value="passagem">Passagem de Ônibus / Avião</SelectItem>
                                            <SelectItem value="fone-viagem">Fones de Ouvido no Avião</SelectItem>
                                            <SelectItem value="itens-hotel">Itens Esquecidos no Hotel</SelectItem>

                                            <SelectLabel>Coisas Pequenas que Sempre Somem</SelectLabel>
                                            <SelectItem value="prendedor">Prendedores de Cabelo</SelectItem>
                                            <SelectItem value="acessorios">Brincos, Anéis, Colares</SelectItem>
                                            <SelectItem value="cartao-credito">Cartões de Crédito / Débito</SelectItem>

                                            <SelectLabel>Itens de Alimentação</SelectLabel>
                                            <SelectItem value="garrafa">Garrafa de Água</SelectItem>
                                            <SelectItem value="tampa-pote">Tampa do Pote de Comida</SelectItem>
                                            <SelectItem value="talher">Talheres Reutilizáveis</SelectItem>
                                            <SelectItem value="lanche">Lanche na Geladeira</SelectItem>

                                            <SelectLabel>Itens de Transporte</SelectLabel>
                                            <SelectItem value="bicicleta">Bicicleta</SelectItem>
                                            <SelectItem value="patinete">Patinete Elétrico</SelectItem>
                                            <SelectItem value="cartao-transporte">Cartão do Ônibus / Metrô</SelectItem>

                                            <SelectLabel>Itens Aleatórios</SelectLabel>
                                            <SelectItem value="senha">Senhas Anotadas</SelectItem>
                                            <SelectItem value="controle-portao">Controle do Portão</SelectItem>
                                            <SelectItem value="ingresso">Ingressos para Eventos</SelectItem>
                                            <SelectItem value="comanda">Comanda de Bar</SelectItem>

                                            <SelectLabel>Itens de Beleza</SelectLabel>
                                            <SelectItem value="batom">Batom</SelectItem>
                                            <SelectItem value="maquiagem">Maquiagem</SelectItem>
                                            <SelectItem value="pente">Pente</SelectItem>
                                            <SelectItem value="escova">Escova de Cabelo</SelectItem>

                                            <SelectLabel>Outros</SelectLabel>
                                            <SelectItem value="outros">Outros</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </label>
                            <label className="w-full">
                                <span>Nome</span>
                                <Input
                                    type="text"
                                    disabled={item !== 'outros'}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setNome(event.target.value)}
                                />
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
