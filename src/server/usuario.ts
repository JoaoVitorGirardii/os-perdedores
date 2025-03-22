import { UsuarioDTO } from '@/dto/usuario.dto'
import { api } from './api'
import { toast } from 'sonner'
import { Paginacao } from '@/dto/paginacao.dto'
import { QueryPaginacaoDTO } from '@/dto/queryPaginacao.dto'
import { LoginDTO, LoginResponseDTO } from '@/dto/login.dto'

export const UsuarioService = {
    async Create(newUser: Omit<UsuarioDTO, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
        try {
            const { data } = await api.post<UsuarioDTO>('/usuario', newUser)
            toast.success(`Novo usuário cadastrado " ${data.nome} "`)
        } catch (erro) {
            console.error(erro)
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
            console.error(erro)
            return null
        }
    },

    async Login(dados: LoginDTO) {
        try {
            const { data } = await api.post<LoginResponseDTO>('/login', dados)
            return data
        } catch (error) {
            console.error(error)
        }
    },
}
