import { UsuarioDTO } from '@/dto/usuario.dto'
import { api } from './api'
import { toast } from 'sonner'
import { Paginacao } from '@/dto/paginacao.dto'
import { QueryPaginacaoDTO } from '@/dto/queryPaginacao.dto'

export const UsuarioService = {
    async Create(newUser: UsuarioDTO): Promise<void> {
        try {
            const { data } = await api.post<UsuarioDTO>('/usuario', newUser)
            toast.success(`Novo usuário cadastrado " ${data.nome} "`)
        } catch (erro) {
            console.log(erro)
            toast.error(JSON.stringify(erro))
        }
    },

    async GetUsuarios({ limit, offSet }: QueryPaginacaoDTO): Promise<Paginacao<UsuarioDTO[]> | null> {
        try {
            const { data } = await api.get<Paginacao<UsuarioDTO[]>>('/usuario/listar', {
                params: {
                    limit,
                    offSet,
                },
            })
            return data
        } catch (erro) {
            console.log(erro)
            toast.error(JSON.stringify(erro))
            return null
        }
    },
}
