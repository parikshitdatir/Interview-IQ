function Results({ evaluation }) {
    if (!evaluation) return null;

    return (
        <div className="min-h-screen bg-slate-950 p-10">
            <div className="mx-auto max-w-5xl">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                    <h1 className="text-4xl font-bold text-white">
                        Interview Results
                    </h1>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        <div className="rounded-xl bg-slate-950 p-6">
                            <p className="text-slate-400">
                                Overall Score
                            </p>

                            <h2 className="mt-2 text-5xl font-bold text-green-400">
                                {evaluation.overall_score}/100
                            </h2>
                        </div>

                        <div className="rounded-xl bg-slate-950 p-6">
                            <p className="text-slate-400">
                                Overall Feedback
                            </p>

                            <p className="mt-2 text-white">
                                {evaluation.overall_feedback}
                            </p>
                        </div>

                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">

                        <div className="rounded-xl bg-slate-950 p-6">
                            <h3 className="mb-4 text-xl font-bold text-green-400">
                                Strengths
                            </h3>

                            <ul className="space-y-2 text-slate-300">
                                {evaluation.strengths?.map((item, index) => (
                                    <li key={index}>
                                        ✓ {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-slate-950 p-6">
                            <h3 className="mb-4 text-xl font-bold text-red-400">
                                Weaknesses
                            </h3>

                            <ul className="space-y-2 text-slate-300">
                                {evaluation.weaknesses?.map((item, index) => (
                                    <li key={index}>
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-slate-950 p-6">
                            <h3 className="mb-4 text-xl font-bold text-blue-400">
                                Recommendations
                            </h3>

                            <ul className="space-y-2 text-slate-300">
                                {evaluation.recommendations?.map((item, index) => (
                                    <li key={index}>
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className="mt-10">

                        <h2 className="mb-5 text-3xl font-bold text-white">
                            Question-wise Feedback
                        </h2>

                        <div className="space-y-5">

                            {evaluation.questions?.map((question, index) => (

                                <div
                                    key={index}
                                    className="rounded-xl bg-slate-950 p-6"
                                >

                                    <div className="flex items-center justify-between">

                                        <h3 className="text-xl font-semibold text-white">
                                            Question {question.question_number}
                                        </h3>

                                        <span className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white">
                                            {question.score}/10
                                        </span>

                                    </div>

                                    <p className="mt-4 text-slate-300">
                                        {question.feedback}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Results;