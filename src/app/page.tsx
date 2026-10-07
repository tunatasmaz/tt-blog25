import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tuna Taşmaz',
  description: 'Girişimci. iz ve Connectlist’in kurucu ortağı.',
}

const APP_STORE = 'https://apps.apple.com/app/id6795542625'
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.izlabs.iz'

const label = 'text-[11px] uppercase tracking-[0.2em]'
const underline =
  'relative inline-block after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-current after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300'

export default function HomePage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-15rem)] max-w-5xl items-center px-4 py-4 md:min-h-[calc(100vh-12rem)] md:py-8">
      <div className="grid w-full gap-7 md:grid-cols-2 md:gap-16">
        {/* Kimlik */}
        <section>
          <h1 className="mb-3 text-2xl font-medium md:mb-6">Tuna Taşmaz</h1>
          <div className="space-y-1 leading-snug text-gray-600">
            <p>Girişimci</p>
            <p className="italic text-gray-400">İstanbul</p>
          </div>

          <div className="mt-4 space-y-1 text-sm leading-snug text-gray-500 md:mt-6">
            <p>Hiç bir şeye bedel ödemeden, acı çekmeden erişemezsin.</p>
            <p>Çok çalışmak yetmez. Ama çalışmalısın ve yolda kalmalısın.</p>
            <p>Ben hala bir yoldayım ve yürümeye devam ediyorum.</p>
          </div>
        </section>

        {/* Projeler */}
        <section className="space-y-6 md:space-y-10">
          <div>
            <div className="mb-4 flex items-center gap-2 text-gray-900">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
              </span>
              <span className={label}>şimdi · kurucu ortak</span>
            </div>

            <a href="https://iz.city" target="_blank" rel="noopener noreferrer">
              <h2 className="text-5xl font-semibold leading-none tracking-tighter md:text-7xl">iz.</h2>
            </a>
            <p className="mt-4 text-xl tracking-tight">iz bırakıyoruz, anı biriktiriyoruz!</p>
            <p className="mt-2 hidden max-w-sm text-sm leading-relaxed text-gray-500 md:block">
              Bir fotoğraf, bir şarkı belki bir cümle. Tam o anda bulunduğun yere bir iz bırak.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <a
                href={APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700"
              >
                App Store
              </a>
              <a
                href={PLAY_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-300 px-4 py-2 font-medium transition-colors hover:border-black"
              >
                Google Play
              </a>
              <a
                href="https://iz.city"
                target="_blank"
                rel="noopener noreferrer"
                className={`${underline} ml-1 text-gray-500 hover:text-black`}
              >
                iz.city ↗
              </a>
            </div>
          </div>

          <a
            href="https://connectlist.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-t border-gray-100 pt-4 md:pt-6"
          >
            <div className={`${label} mb-3 text-gray-300`}>yakında · kurucu ortak</div>
            <h2 className="text-2xl font-medium tracking-tight text-gray-300 transition-colors duration-500 group-hover:text-gray-500">
              connect:list
            </h2>
            <p className="mt-1 text-sm text-gray-300 transition-colors duration-500 group-hover:text-gray-500">
              yeni bir keşif ağı · hazırlanıyoruz
            </p>
          </a>
        </section>
      </div>
    </div>
  )
}
