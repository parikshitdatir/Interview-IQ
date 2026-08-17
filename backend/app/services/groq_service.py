import json

from groq import Groq

from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)


def test_connection():
    response = client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=[
            {
                "role": "user",
                "content": "Reply with exactly: Groq Connected",
            }
        ],
        temperature=0,
    )

    return response.choices[0].message.content


def generate_questions(role, difficulty, questions):
    prompt = f"""
You are a Senior Software Engineer.

Generate exactly {questions} technical interview questions for a {difficulty} {role} interview.

Rules:

- Return ONLY valid JSON.
- No markdown.
- No explanations.
- No numbering.
- Questions should progressively increase in difficulty.

Return:

{{
    "questions": [
        "Question 1",
        "Question 2"
    ]
}}
"""

    response = client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.7,
    )

    content = response.choices[0].message.content.strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "questions": [
                line.strip("1234567890. ")
                for line in content.split("\n")
                if line.strip()
            ]
        }


def evaluate_answer(question, answer):
    prompt = f"""
You are a Senior Technical Interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer STRICTLY.

Return:

Score: x/10

Strengths

Weaknesses

Ideal Answer

Improvement Tips
"""

    response = client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content


def evaluate_interview(answers):

    cleaned_answers = []

    auto_feedback = []

    for index, item in enumerate(answers, start=1):

        answer = item["answer"].strip()

        words = len(answer.split())

        if (
            not answer
            or words < 5
            or answer.lower() in [
                "yes",
                "no",
                "idk",
                "i don't know",
                "don't know",
                "n/a",
                "none",
                "skip",
            ]
        ):
            auto_feedback.append(
                {
                    "question_number": index,
                    "score": 0,
                    "feedback": "No meaningful answer was provided.",
                }
            )

        else:
            cleaned_answers.append(
                {
                    "question": item["question"],
                    "answer": answer,
                    "question_number": index,
                }
            )

    if not cleaned_answers:

        return {
            "overall_score": 0,
            "overall_feedback": "No meaningful answers were submitted.",

            "strengths": [],

            "weaknesses": [
                "Questions were skipped.",
                "No technical knowledge could be evaluated.",
            ],

            "recommendations": [
                "Attempt every question.",
                "Explain your reasoning.",
                "Provide practical examples.",
            ],

            "questions": auto_feedback,
        }

    formatted_answers = ""

    for item in cleaned_answers:

        formatted_answers += f"""

Question {item["question_number"]}

{item["question"]}

Candidate Answer

{item["answer"]}

----------------------------------------

"""

    prompt = f"""
You are a Senior Software Engineer conducting interviews at Google, Microsoft, Amazon and Meta.

Evaluate this interview EXTREMELY STRICTLY.

Scoring Rules

0/10
- Empty answer
- Irrelevant answer
- Wrong answer

1-3/10
- Poor understanding

4-6/10
- Partial understanding

7-8/10
- Good understanding

9-10/10
- Excellent answer with correct technical explanation.

DO NOT inflate scores.

Average candidates should score around 50-70.

Excellent candidates may score above 85.

Return ONLY valid JSON.

{formatted_answers}

Return:

{{
    "overall_score": 75,

    "overall_feedback": "...",

    "strengths": [
        "...",
        "..."
    ],

    "weaknesses": [
        "...",
        "..."
    ],

    "recommendations": [
        "...",
        "..."
    ],

    "questions": [
        {{
            "question_number": 1,
            "score": 8,
            "feedback": "..."
        }}
    ]
}}
"""

    response = client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
    )

    content = response.choices[0].message.content.strip()

    try:

        result = json.loads(content)

        result["questions"].extend(auto_feedback)

        result["questions"] = sorted(
            result["questions"],
            key=lambda x: x["question_number"],
        )

        return result

    except json.JSONDecodeError:

        return {
            "overall_score": 0,
            "overall_feedback": content,
            "strengths": [],
            "weaknesses": [],
            "recommendations": [],
            "questions": auto_feedback,
        }