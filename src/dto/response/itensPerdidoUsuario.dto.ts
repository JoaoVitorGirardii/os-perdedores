import { ItemPerdidoDTO } from '../itemPerdido.dto'

export type ItensPerdidosUsuarioDTO = {
    itensPerdidos: ItemPerdidoDTO[]
    totalDeFinanceiro: number
}
