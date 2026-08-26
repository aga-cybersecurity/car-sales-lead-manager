export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md text-white px-8 py-5 flex justify-between items-center">

    <h2>

        <span className="ml-2 text-sm font-normal text-gray-400">
          Land Rover Novi
        </span>
      </h2>

      <div className="hidden md:flex gap-8 text-sm">
        <a href="#home" className="hover:text-yellow-500 transition">
          Home
        </a>

        <a href="#about" className="hover:text-yellow-500 transition">
          About
        </a>

        <a href="#contact" className="hover:text-yellow-500 transition">
          Contact
        </a>
      </div>

      <a
        href="https://www.landrovernovi.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-600 px-6 py-3 rounded-full inline-block"
      >
        Browse Cars
      </a>

    </nav>
  );
}