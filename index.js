const quizData = [
    { 
        question: "Which type of client excites you most?", 
        options: ["First-time buyers", "Luxury sellers", "Investors", "Vacation/second home buyers"] 
    },
    { 
        question: "Which activity would you enjoy most?", 
        options: ["Hosting open houses", "Negotiating high-end deals", "Analyzing market data", "Showcasing lifestyle properties"]
    },
    { 
        question: "Where would you like most of your business to come from?", 
        options: ["Referrals & sphere", "High-net-worth circles", "Networking with investors", "Vacation communities"]
    },
    { 
        question: "What type of marketing feels most natural to you?", 
        options: ["Social media stories & reels", "Luxury print & branding", "ROI-driven campaigns", "Scenic lifestyle photography"]
    },
    { 
        question: "Which describes your dream client interaction?", 
        options: ["Helping someone buy their first home", "Selling a multi-million-dollar property", "Helping someone grow wealth", "Selling a dream beach or golf home"]
    }
];

const resultsMap = [
    { niche: "First-Time Buyer Specialist", desc: "You thrive helping new buyers enter the market!" },
    { niche: "Luxury Listing Agent", desc: "High-end properties and exclusive marketing are your sweet spot." },
    { niche: "Investor/ROI Specialist", desc: "You excel working with investors and wealth builders." },
    { niche: "Vacation & Lifestyle Agent", desc: "Second homes, beach, and golf communities fit your style." }
];

const quizContainer = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const emailCapture = document.getElementById('email-capture');
const submitEmail = document.getElementById('submit-email');
const progressBar = document.getElementById('progress-bar');

let currentQuestion = 0;
let selectedAnswers = [];

function loadQuestion() {
    quizContainer.innerHTML = `
        <h2>${quizData[currentQuestion].question}</h2>
        ${quizData[currentQuestion].options.map((opt, index) => 
            `<button class="option-btn" onclick="selectAnswer(${index})">${opt}</button>`
        ).join('')}
    `;
    updateProgress();
}

function selectAnswer(index) {
    selectedAnswers.push(index);
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        quizContainer.classList.add('hidden');
        nextBtn.classList.add('hidden');
        emailCapture.classList.remove('hidden');
    }
}

function updateProgress() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = progress + "%";
}

submitEmail.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    if (!email) return alert("Please enter your email!");

    const counts = [0,0,0,0];
    selectedAnswers.forEach(ans => counts[ans]++);
    const maxIndex = counts.indexOf(Math.max(...counts));
    const result = resultsMap[maxIndex];

    resultDiv.innerHTML = `<h2>${result.niche}</h2><p>${result.desc}</p>`;
    resultDiv.classList.remove('hidden');
    emailCapture.classList.add('hidden');

    // Send to Google Sheets
    fetch("YOUR_WEBHOOK_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, result: result.niche })
    });
});

loadQuestion();
