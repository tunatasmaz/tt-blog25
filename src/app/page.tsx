import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-medium">Tuna Taşmaz</h1>
          <h2 className="text-gray-600 dark:text-gray-400">Product Designer</h2>
          <p className="text-gray-600 dark:text-gray-400 italic">Istanbul, TURKEY</p>
        </div>

        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            Üzerinde çalıştığım ya da ilham alarak boş zamanlarımda tasarladığım
            tüm çalışmaları burada paylaşıyorum.
          </p>
          <p>Fotoğraf çekmeyi,</p>
          <p>Kitap okumayı seviyorum.</p>
          <p>Farklı konularda makaleler yazıyorum.</p>
        </div>

        <div>
          <a 
            href="mailto:your-email@example.com" 
            className="inline-block text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            Beraber tasarlamak için bana ulaşabilirsin
          </a>
        </div>
      </div>
    </div>
  );
}
