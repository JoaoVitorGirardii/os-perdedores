import { ItemPerdidoDTO } from '@/dto/itemPerdido.dto'
import { api } from './api'
import { toast } from 'sonner'
import { ItensPerdidosUsuarioDTO } from '@/dto/response/itensPerdidoUsuario.dto'
import { QueryPaginacaoDTO } from '@/dto/queryPaginacao.dto'
import { Paginacao } from '@/dto/paginacao.dto'
import { TopDezPerdedoresDTO } from '@/dto/response/topDezPerdedores.dto'
import { TopDezDTO } from '@/dto/response/topDez.dto'
import { ListaTopDez } from '@/enums/listaTopDez'

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
    async TopDezUsuarios(): Promise<TopDezPerdedoresDTO | null> {
        try {
            const { data } = await api.get<TopDezPerdedoresDTO>('/itens-perdidos/top10/usuarios')
            return data
        } catch (error) {
            console.error(error)
            return null
        }
    },
    async TopDez(type: ListaTopDez): Promise<TopDezDTO | null> {
        try {
            const { data } = await api.get<TopDezDTO>('/itens-perdidos/top10', {
                params: {
                    type,
                },
            })
            return data
        } catch (error) {
            console.error(error)
            return null
        }
    },
}
