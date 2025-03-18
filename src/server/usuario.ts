import { UsuarioDTO } from '@/dto/usuario.dto'
import { api } from './api'
import { toast } from 'sonner'

export const UsuarioService = {
    async Create(newUser: UsuarioDTO): Promise<void> {
        try {
            const { data } = await api.post<UsuarioDTO>('/usuario', newUser)
            toast.success(`Novo usuário cadastrado [${data.nome}]`)
        } catch (erro) {
            console.log(erro)
            toast.error(JSON.stringify(erro))
        }
    },

    async GetUsuarios(): Promise<UsuarioDTO[]> {
        try {
            const { data } = await api.get<UsuarioDTO[]>('/usuario/listar')
            return data
        } catch (erro) {
            console.log(erro)
            toast.error(JSON.stringify(erro))
            return []
        }
    },
}
