import Image from 'next/image'
import ImgHome from '../../../../public/imgs/home-box.png'

export default function Home() {
    return (
        <main className="p-8 space-y-8">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-center">Os Perdedores</h1>
                <p className="text-muted-foreground text-center">
                    Sistema consistem em você gravar o seu item perdido e consultar os itens alguns top itens mais perdidos
                </p>
                <div className="relative w-full h-[600px] flex items-center justify-center">
                    <Image src={ImgHome} alt="Logo Os Perdedores" className="object-contain mix-blend-multiply" priority fill />
                </div>
            </div>
        </main>
    )
}
