import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-100 py-6 mt-12 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            {currentYear} Tuna Taşmaz. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://twitter.com/tunatasmaz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://linkedin.com/in/tunatasmaz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://vsco.co/tunatasmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm7.2 14.352c-.384.66-3.244 4.148-7.2 4.148s-6.816-3.488-7.2-4.148c-.384-.66-.384-4.704 0-5.364.384-.66 3.244-4.148 7.2-4.148s6.816 3.488 7.2 4.148c.384.66.384 4.704 0 5.364z M12 7.2c-2.648 0-4.8 2.152-4.8 4.8s2.152 4.8 4.8 4.8 4.8-2.152 4.8-4.8-2.152-4.8-4.8-4.8z" />
              </svg>
              <span className="sr-only">VSCO</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
