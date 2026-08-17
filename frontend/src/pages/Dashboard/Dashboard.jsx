import { useEffect, useState } from "react";
import InterviewCard from "../../components/InterviewCard/InterviewCard";
import api from "../../services/api";

function Dashboard() {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        async function fetchInterviews() {
            try {
                const response = await api.get("/interviews");
                setInterviews(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchInterviews();
    }, []);
    return (
        <div className="min-h-screen bg-slate-950 px-8 py-12">
            <h1 className="mb-3 text-5xl font-bold text-white">
                Welcome Back 👋
            </h1>

            <p className="mb-10 text-slate-400">
                Choose an interview to begin your AI practice session.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                    <InterviewCard
                        key={interview.title}
                        interview={interview}
                    />
                ))}
            </div>

            {/* Recent Interviews */}

            <div className="mt-14">
                <h2 className="mb-6 text-3xl font-bold text-white">
                    Recent Interviews
                </h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-5">
                        <span className="text-white">Python Developer</span>
                        <span className="font-bold text-green-400">92%</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-5">
                        <span className="text-white">Machine Learning</span>
                        <span className="font-bold text-yellow-400">88%</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-5">
                        <span className="text-white">Data Science</span>
                        <span className="font-bold text-blue-400">91%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;