import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto mt-5 flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-950/70 px-8 backdrop-blur-xl">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-blue-400" />
          <h1 className="text-xl font-bold text-white">
            Interview IQ
          </h1>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm text-slate-300">
          <a href="#" className="transition hover:text-white">Home</a>
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#about" className="transition hover:text-white">About</a>
        </div>

        {/* CTA */}
        <Link to="/login">
  <button className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition duration-200 hover:bg-blue-700">
    Start Free
  </button>
</Link>

      </nav>
    </header>
  );
}

export default Navbar;