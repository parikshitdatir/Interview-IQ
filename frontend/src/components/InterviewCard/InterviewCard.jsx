import { Link } from "react-router-dom";
function InterviewCard({ interview }) {
  return (
  <Link to={`/interview/${interview.id}`}>
    <div className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800">

      <div className="mb-4 text-4xl">
        {interview.icon}
      </div>

      <h3 className="text-xl font-bold text-white">
        {interview.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {interview.description}
      </p>

    </div>
  </Link>
);
}

export default InterviewCard;