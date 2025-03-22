export type LoginDTO = {
    usuario: string
    senha: string
}

export type userDTO = {
    id: string
    nome: string
    tipo: string
}

export type LoginResponseDTO = {
    token: string
    user: userDTO
}
