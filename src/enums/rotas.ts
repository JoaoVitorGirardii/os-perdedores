import { ListaTopDez } from './listaTopDez'

const RotaAdmin = '/admin'
const RotaOsPerdedores = '/os-perdedores'
const RotaTopDez = RotaOsPerdedores + '/top10/'

export enum Rotas {
    LOGIN = '/',
    HOME = RotaOsPerdedores + '/home',
    ITENS_PERDIDOS = RotaOsPerdedores + '/itens-perdidos',

    TOP10_PERDEDORES = RotaTopDez + '/perdedores',
    TOP10_ITENS_MAIS_PERDIDOS = RotaTopDez + ListaTopDez.ITENS_MAIS_PERDIDOS,
    TOP10_MAIS_PERDIDO_MULHERES = RotaTopDez + ListaTopDez.ITENS_MAIS_PERDIDOS_MULHERES,
    TOP10_MAIS_PERDIDO_HOMENS = RotaTopDez + ListaTopDez.ITENS_MAIS_PERDIDOS_HOMEM,
    TOP10_MAIS_PERDIDO_SEMANA = RotaTopDez + ListaTopDez.ITENS_MAIS_PERDIDOS_SEMANA,
    TOP10_MAIS_PERDIDO_MES = RotaTopDez + ListaTopDez.ITENS_MAIS_PERDIDOS_MES,

    CADASTRO_ITENS = RotaOsPerdedores + '/cadastro/item-perdido',

    CRIAR_NOVA_CONTA = '/criar-conta',
    CADASTRO_USUARIO = RotaAdmin + '/cadastros/usuario',
    LISTA_USUARIOS = RotaAdmin + '/lista/usuarios',
}
