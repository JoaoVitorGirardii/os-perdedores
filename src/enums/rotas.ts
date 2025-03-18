const RotaAdmin = '/admin'
export enum Rotas {
    HOME = '/home',
    ITENS_PERDIDOS = '/itens-perdidos',

    TOP10_PERDEDORES = '/top10/perdedores',
    TOP10_ITENS_MAIS_PERDIDOS = '/top10/itens-mais-perdidos',
    TOP10_MAIS_PERDIDO_MULHERES = '/top10/mulheres',
    TOP10_MAIS_PERDIDO_HOMENS = '/top10/homens',
    TOP10_MAIS_PERDIDO_SEMANA = '/top10/semana',
    TOP10_MAIS_PERDIDO_MES = '/top10/mes',

    CADASTRO_ITENS = '/cadastro/item-perdido',

    CADASTRO_USUARIO = RotaAdmin + '/cadastros/usuario',
    LISTA_USUARIOS = RotaAdmin + '/lista/usuarios',
}
