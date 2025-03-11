import Image from 'next/image'

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/cadastro/item-perdido">
                    <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
                    Go to cadastro item perdido →
                </a>
            </main>
        </div>
    )
}
