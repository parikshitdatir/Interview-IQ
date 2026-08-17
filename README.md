# 🤖 Interview IQ

An AI-powered mock interview platform built using **React, FastAPI, Groq LLM, JWT Authentication, SQLAlchemy, and SQLite**.

Interview IQ helps users prepare for technical interviews by generating AI-powered interview questions and providing intelligent feedback based on their answers.

---

## ✨ Features

- 🔐 Secure User Authentication (JWT)
- 👤 User Registration & Login
- 🤖 AI-generated Interview Questions
- 🧠 AI-powered Interview Evaluation
- 📊 Detailed Interview Feedback
- ⚡ FastAPI REST Backend
- 🎨 Modern React + Tailwind CSS Interface
- 🗄 SQLite Database Integration

---

## 📸 Screenshots

### 🏠 Landing Page

![Landing](assets/landing.png)

---

### 🔐 Login

![Login](assets/login.png)

---

### 👤 Register

![Register](assets/register.png)

---

### 📊 Dashboard

![Dashboard](assets/dashboard.png)

---

### 🤖 Interview

![Interview](assets/interview.png)

---

### 🧠 Results

![Results](assets/results.png)

---

## 🛠 Tech Stack

### Frontend

- React
- Tailwind CSS
- React Router
- Axios

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib
- Pydantic

### AI

- Groq API
- Llama 3.1 8B Instant

---

## 📂 Project Structure

```text
Interview-IQ
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── auth
│   │   ├── core
│   │   ├── crud
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
├── assets
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/parikshitdatir/Interview-IQ.git
```

---

### Backend Setup

```bash
cd backend

python -m venv venv
```

Activate Virtual Environment

#### Windows

```bash
.\venv\Scripts\Activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run Backend

```bash
uvicorn app.main:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```text
http://localhost:5173
```

Backend runs at

```text
http://127.0.0.1:8000
```

---

## 📖 How It Works

1. Register or log in.
2. Choose an interview domain.
3. AI generates interview questions.
4. Answer each question.
5. AI evaluates your responses.
6. Receive an overall score and detailed feedback.

---

## 🚀 Upcoming Features

- 📚 Interview History
- 📄 Resume Analyzer
- 🎯 ATS Resume Checker
- 🎙 AI Voice Interview
- 📈 Dashboard Analytics
- 🌐 Cloud Deployment
- 📱 Responsive Mobile UI

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create your feature branch.

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes.

```bash
git commit -m "feat: add new feature"
```

4. Push to your branch.

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request.

---

## 👨‍💻 Author

**Parikshit Datir**

GitHub: https://github.com/parikshitdatir

LinkedIn: *(Add your LinkedIn profile here)*

---

## 📜 License

This project is licensed under the MIT License.