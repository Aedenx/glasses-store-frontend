export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 py-6 lg:px-14">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-[2px]">
            IKHWAN VISION
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 rounded-full border border-white/15 bg-black/30 p-2 backdrop-blur-xl md:flex">

          <a
            href="#hero"
            className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black"
          >
            SUNGLASSES
          </a>

          <a
            href="#lookbook"
            className="rounded-full px-5 py-2.5 text-xs font-semibold text-white/80 transition hover:bg-white/10"
          >
            LOOKBOOK
          </a>

          <a
            href="#features"
            className="rounded-full px-5 py-2.5 text-xs font-semibold text-white/80 transition hover:bg-white/10"
          >
            FEATURES
          </a>

          <a
            href="#contact"
            className="rounded-full px-5 py-2.5 text-xs font-semibold text-white/80 transition hover:bg-white/10"
          >
            CONTACT
          </a>

        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3">

          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl">
            🛍
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl">
            ♡
          </button>

        </div>

      </div>
    </header>
  );
}