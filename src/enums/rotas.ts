const RotaAdmin = '/admin'
const RotaOsPerdedores = '/os-perdedores'

export enum Rotas {
    LOGIN = '/',
    HOME = RotaOsPerdedores + '/home',
    ITENS_PERDIDOS = RotaOsPerdedores + '/itens-perdidos',

    TOP10_PERDEDORES = RotaOsPerdedores + '/top10/perdedores',
    TOP10_ITENS_MAIS_PERDIDOS = RotaOsPerdedores + '/top10/itens-mais-perdidos',
    TOP10_MAIS_PERDIDO_MULHERES = RotaOsPerdedores + '/top10/mulheres',
    TOP10_MAIS_PERDIDO_HOMENS = RotaOsPerdedores + '/top10/homens',
    TOP10_MAIS_PERDIDO_SEMANA = RotaOsPerdedores + '/top10/semana',
    TOP10_MAIS_PERDIDO_MES = RotaOsPerdedores + '/top10/mes',

    CADASTRO_ITENS = RotaOsPerdedores + '/cadastro/item-perdido',

    CRIAR_NOVA_CONTA = '/criar-conta',
    CADASTRO_USUARIO = RotaAdmin + '/cadastros/usuario',
    LISTA_USUARIOS = RotaAdmin + '/lista/usuarios',
}
