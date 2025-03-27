export type TopDezPerdedoresDTO = {
    itens: ItensDTO[]
}

type ItensDTO = {
    quantidade: number
    valorTotal: number
    nomeUsuario: string
}
