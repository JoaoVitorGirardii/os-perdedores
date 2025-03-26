import { ItemPerdidoDTO } from '@/dto/itemPerdido.dto'
import { api } from './api'
import { toast } from 'sonner'
import { ItensPerdidosUsuarioDTO } from '@/dto/response/itensPerdidoUsuario.dto'
import { QueryPaginacaoDTO } from '@/dto/queryPaginacao.dto'
import { Paginacao } from '@/dto/paginacao.dto'

export const ItemPerdidoService = {
    async Create(data: Omit<ItemPerdidoDTO, 'id'>) {
        try {
            const resposta = await api.post('/item-perdido', data)
            toast.success('Novo item cadastrado com sucesso')
            return resposta
        } catch (error) {
            console.error(error)
        }
    },
    async GetItensByUsuarioId(payload: { usuarioId: string; paginacao: QueryPaginacaoDTO }) {
        try {
            const { data } = await api.get<Paginacao<ItensPerdidosUsuarioDTO>>(`/itens-perdidos/usuario/${payload.usuarioId}`, {
                params: {
                    limit: payload.paginacao.limit,
                    offSet: payload.paginacao.offSet,
                },
            })
            return data
        } catch (error) {
            console.error(error)
            return null
        }
    },
}
