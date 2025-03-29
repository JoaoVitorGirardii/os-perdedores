import { UsuarioDTO } from '@/dto/usuario.dto'
import { api } from './api'
import { toast } from 'sonner'
import { Paginacao } from '@/dto/paginacao.dto'
import { QueryPaginacaoDTO } from '@/dto/queryPaginacao.dto'
import { LoginDTO, LoginResponseDTO } from '@/dto/login.dto'
import { CreateUserDTO } from '@/dto/createUser.dto'

export const UsuarioService = {
    async CreateAdmin(newUser: CreateUserDTO): Promise<void> {
        try {
            const { data } = await api.post<UsuarioDTO>('/usuario-admin', newUser)
            toast.success(`Novo usuário cadastrado " ${data.nome} "`)
        } catch (erro) {
            console.error(erro)
        }
    },
    async CreateUsuario(dados: CreateUserDTO): Promise<boolean> {
        try {
            const { data } = await api.post('/usuario', dados)
            toast.success(`${data.nome}, seu usuário foi cadastrado com sucesso.`)
            return true
        } catch (error) {
            console.error(error)
            return false
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
