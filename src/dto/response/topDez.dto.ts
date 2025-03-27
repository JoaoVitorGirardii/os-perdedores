export type TopDezDTO = {
    itens: ItensDTO[]
}

type ItensDTO = {
    quantidade: number
    valorTotal: number
    nomeItem: string
    totalFeminino: string
    totalMasculino: string
}
