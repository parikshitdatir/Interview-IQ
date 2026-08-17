import DashboardPreview from "../DashboardPreview/DashboardPreview";
function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center justify-between px-8">

        {/* Left */}
        <div className="max-w-2xl">

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            ✨ AI Interview Copilot
          </span>

          <h1 className="mt-8 text-7xl font-extrabold leading-tight text-white">
            Ace Every
            <br />

            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Technical Interview
            </span>

            <br />

            with AI
          </h1>

          <p className="mt-8 text-xl leading-9 text-slate-400">
            Practice realistic interviews, receive personalized AI
            feedback and improve your confidence before your next
            interview.
          </p>

          <div className="mt-10 flex gap-5">

            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
              Start Interview
            </button>

            <button className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-slate-300 transition hover:border-white hover:text-white">
              Learn More
            </button>

          </div>

        </div>

        {/* Right */}
        <DashboardPreview />

      </div>
    </section>
  );
}

export default Hero;