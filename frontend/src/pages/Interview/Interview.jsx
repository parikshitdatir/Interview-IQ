import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import Results from "../../components/Interview/Results";

function Interview() {
    const { id } = useParams();

    const [interview, setInterview] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [evaluation, setEvaluation] = useState(null);

    const [loading, setLoading] = useState(true);
    const [evaluating, setEvaluating] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadInterview() {
            try {
                const response = await api.get("/interviews");

                const selected = response.data.find(
                    (item) => item.id === Number(id)
                );

                if (!selected) {
                    setLoading(false);
                    return;
                }

                setInterview(selected);

                const aiResponse = await api.post(
                    "/generate-questions",
                    {
                        role: selected.title,
                        difficulty: selected.difficulty,
                        questions: selected.questions,
                    }
                );

                setQuestions(aiResponse.data.questions);

            } catch (err) {
                console.error(err);
            }

            setLoading(false);
        }

        loadInterview();
    }, [id]);

    async function nextQuestion() {

        if (!currentAnswer.trim()) {
            setError("Please answer the question before continuing.");
            return;
        }

        setError("");

        const updatedAnswers = [
            ...answers,
            {
                question: questions[currentQuestion],
                answer: currentAnswer.trim(),
            },
        ];

        setAnswers(updatedAnswers);

        setCurrentAnswer("");

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            return;
        }

        setEvaluating(true);

        try {

            const response = await api.post(
                "/evaluate-interview",
                {
                    answers: updatedAnswers,
                }
            );

            setEvaluation(response.data);

        } catch (err) {
            console.error(err);
        }

        setEvaluating(false);
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <h1 className="text-3xl font-bold text-white">
                    🤖 Generating AI Interview...
                </h1>
            </div>
        );
    }

    if (evaluating) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <h1 className="text-3xl font-bold text-white">
                    🧠 AI is evaluating your interview...
                </h1>
            </div>
        );
    }

    if (evaluation) {
        return <Results evaluation={evaluation} />;
    }

    if (!interview) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                Interview not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-10">

            <div className="mx-auto max-w-5xl">

                <h1 className="text-5xl font-bold text-white">
                    {interview.title} Interview
                </h1>

                <p className="mt-3 text-slate-400">
                    Answer each question carefully.
                </p>

                <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">

                    <p className="text-lg font-semibold text-blue-400">
                        Question {currentQuestion + 1} of {questions.length}
                    </p>

                    <h2 className="mt-6 text-3xl font-bold text-white">
                        {questions[currentQuestion]}
                    </h2>

                    <textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="mt-8 h-48 w-full rounded-xl border border-slate-700 bg-slate-950 p-5 text-white outline-none focus:border-blue-500"
                    />

                    {error && (
                        <div className="mt-4 rounded-lg bg-red-900/30 p-3 text-red-300">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">

                        <button
                            onClick={nextQuestion}
                            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            {currentQuestion === questions.length - 1
                                ? "Finish Interview"
                                : "Next Question →"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Interview;