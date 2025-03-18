import { tipoUsuario } from '@/enums/tipoUsuario'

export type UsuarioDTO = {
    id?: string
    nome: string
    tipo: tipoUsuario
    ativo?: boolean
}
