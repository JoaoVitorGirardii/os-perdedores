import { CategoriaDTO } from '@/dto/categoria.dto'
import { api } from './api'

export const CategoriaServer = {
    async GetCategorias(): Promise<CategoriaDTO[]> {
        try {
            const { data } = await api.get<CategoriaDTO[]>('/categoria')
            return data
        } catch (error) {
            console.error(error)
            return []
        }
    },
}
