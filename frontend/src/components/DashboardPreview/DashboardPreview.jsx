function DashboardPreview() {
  return (
    <div className="w-[430px] rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Latest Interview</p>
          <h2 className="text-xl font-bold text-white">
            Python Developer
          </h2>
        </div>

        <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
          92%
        </div>
      </div>

      <div className="mt-8 space-y-5">

        <Progress title="Technical" value="95%" color="bg-blue-500" />

        <Progress title="Communication" value="88%" color="bg-yellow-400" />

        <Progress title="Confidence" value="91%" color="bg-green-400" />

      </div>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-sm text-slate-400">
          AI Feedback
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Strong technical knowledge. Improve answer structure
          and provide more real-world examples.
        </p>
      </div>

    </div>
  );
}

function Progress({ title, value, color }) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-slate-400">{title}</span>
        <span className="text-white">{value}</span>
      </div>

      <div className="h-2 rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: value }}
        />
      </div>
    </div>
  );
}

export default DashboardPreview;