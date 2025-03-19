import { CategoriaDTO } from '@/dto/categoria.dto'
import { api } from './api'
import { toast } from 'sonner'

export const CategoriaServer = {
    async GetCategorias(): Promise<CategoriaDTO[]> {
        try {
            const { data } = await api.get<CategoriaDTO[]>('/categoria')
            return data
        } catch (error) {
            toast.error('Erro ao carregar categorias.')
            console.error(error)
            return []
        }
    },
}
