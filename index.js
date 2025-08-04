alert("JS Loaded!");
// ==================== QUIZ CONFIGURATION ====================
const quizData = [
    {
        question: "How do you primarily find new clients?",
        options: ["Sphere of Influence", "Open Houses", "Social Media", "Online Leads", "Agent Referrals"]
    },
    {
        question: "Which Keller Williams tool do you use the most?",
        options: ["Command SmartPlans", "Opportunities", "KW App", "MLS Searches", "I don't use KW tools yet"]
    },
    {
        question: "What is your biggest challenge in real estate right now?",
        options: ["Lead Generation", "Follow-Up Consistency", "Marketing Listings", "Time Management", "Client Conversions"]
    },
    {
        question: "How often do you communicate with your database?",
        options: ["Weekly", "Monthly", "Quarterly", "Rarely", "Never"]
    },
    {
        question: "Which area would you like to master next?",
        options: ["Listings", "Leads", "Leverage/Systems", "Marketing & Social Media", "Client Experience"]
    }
];

// Define outcomes with title and bullet-point action steps
const resultsMap = [
    {
        title: "Your Niche is: Sphere Builder",
        description: [
            "Focus on growing your Sphere of Influence.",
            "Use DTD2 and SmartPlans to reach out consistently.",
            "Host at least one client event or pop-by each quarter.",
            "Track touches in Command for better follow-up."
        ]
    },
    {
        title: "Your Niche is: Open House Specialist",
        description: [
            "Master hosting at least 2 open houses per month.",
            "Promote via Command landing pages and social media.",
            "Leverage sign-in sheets to grow your database.",
            "Follow up within 24 hours for max conversion."
        ]
    },
    {
        title: "Your Niche is: Social Media Connector",
        description: [
            "Create a 30-day social media plan in advance.",
            "Post engaging content at least 3x per week.",
            "Use reels and stories to increase engagement.",
            "Promote listings using Command campaigns."
        ]
    },
    {
        title: "Your Niche is: Online Lead Converter",
        description: [
            "Set up automated follow-up with SmartPlans.",
            "Respond to new leads within 5 minutes if possible.",
            "Track lead sources and ROI in Command.",
            "Nurture leads with drip content and calls."
        ]
    },
    {
        title: "Your Niche is: Referral Networker",
        description: [
            "Build relationships with agents in other markets.",
            "Join KW Referrals and check daily opportunities.",
            "Send monthly updates to your referral partners.",
            "Track and reward agent-to-agent referrals."
        ]
    }
];

// Google Script Web App URL (Replace with yours)
const WEB_APP_URL = https://script.google.com/macros/s/AKfycbxsqVkx6Sw8nDhyaw1MP3HKH8ormGEl9DDbGsbK3BzLGK0BMsKYs2-j8uLH08rzikr3/exec;

let currentQuestion = 0;
let userAnswers = [];
let userName = "";
let userEmail = "";

// Elements
const quizContainer = document.getElementById("quiz");
const progressBar = document.getElementById("progress-bar");
const quizContent = document.createElement("div");
quizContainer.appendChild(quizContent);

function startQuiz() {
    quizContent.innerHTML = `
        <h2>Welcome to the KW Niche Quiz</h2>
        <p>Find your real estate focus and get a personalized action plan.</p>
        <input id="nameInput" placeholder="Your Name" /><br><br>
        <input id="emailInput" placeholder="Your Email" /><br><br>
        <button onclick="beginQuestions()">Start Quiz</button>
    `;
}

function beginQuestions() {
    userName = document.getElementById("nameInput").value;
    userEmail = document.getElementById("emailInput").value;

    if (!userName || !userEmail) {
        alert("Please enter both name and email to continue.");
        return;
    }

    showQuestion();
}

function showQuestion() {
    const questionObj = quizData[currentQuestion];

    progressBar.style.width = ((currentQuestion / quizData.length) * 100) + "%";

    quizContent.innerHTML = `
        <h3>${questionObj.question}</h3>
        ${questionObj.options.map(option => `
            <button class="option-btn" onclick="selectAnswer('${option}')">${option}</button>
        `).join("")}
    `;
}

function selectAnswer(answer) {
    userAnswers.push(answer);
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    progressBar.style.width = "100%";

    const resultIndex = Math.floor(Math.random() * resultsMap.length);
    const resultData = resultsMap[resultIndex];

    quizContent.innerHTML = `
        <h2>Quiz Complete!</h2>
        <h3>${resultData.title}</h3>
        <ul>
            ${resultData.description.map(item => `<li>${item}</li>`).join("")}
        </ul>
        <p><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0-fXO8E-zSCfb3lW9QiFna-c9Ukqehhs__sWWy5T06OilXj0dr8X5oChk4bjstqfBnHnTz4c-M" target="_blank">
        Book Your Strategy Session</a></p>
    `;

    // Send to Google Sheet
    submitResults(userName, userEmail, resultData.title);
}

function submitResults(name, email, result) {
    const payload = { name, email, result };

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.text())
    .then(data => console.log("Submitted to Sheet:", data))
    .catch(err => console.error("Submission error:", err));
}

startQuiz();
