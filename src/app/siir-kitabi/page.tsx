import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Şiir Kitabı | Şiir Koleksiyonum',
  description: 'Yazdığım şiirler ve düşünceler',
}

export default function PoemsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Şiir Kitabı</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Yakında şiirlerim burada olacak...</p>
      </div>
    </div>
  )
}
