export default function Footer() {
  return (
    <footer
      id="contact"
      className="flex flex-col justify-between gap-6 border-t border-white/5 bg-[#0a0a0b] px-6 py-10 text-white md:flex-row md:items-center lg:px-14"
    >

      <div className="text-sm text-white/50">
        © 2026 IKHWAN VISION. All rights reserved.
      </div>

      <div className="flex gap-6">

        <a
          href="#"
          className="text-white/60 transition hover:text-white"
        >
          Instagram
        </a>

        <a
          href="#"
          className="text-white/60 transition hover:text-white"
        >
          Facebook
        </a>

        <a
          href="#"
          className="text-white/60 transition hover:text-white"
        >
          X
        </a>

        <a
          href="#"
          className="text-white/60 transition hover:text-white"
        >
          Behance
        </a>

      </div>

    </footer>
  );
}