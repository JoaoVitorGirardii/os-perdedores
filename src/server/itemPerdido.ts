import { ItemPerdidoDTO } from '@/dto/itemPerdido.dto'
import { api } from './api'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const ItemPerdidoService = {
    async Create(data: Omit<ItemPerdidoDTO, 'id'>) {
        try {
            const resposta = await api.post('/item-perdido', data)
            toast.success('Novo item cadastrado com sucesso')
            return resposta
        } catch (error) {
            console.error(error)
            if (error instanceof AxiosError) {
                toast.error(JSON.stringify(error.response?.data))
            }
        }
    },
}
