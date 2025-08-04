// KW PSL Niche Quiz - Fresh Version
// Handles questions, progress, results, and Google Sheet email webhook

const questions = [
  {
    question: "Which type of clients do you most enjoy working with?",
    answers: ["First-time buyers", "Luxury buyers", "Investors", "Vacation/second-home buyers"]
  },
  {
    question: "Which property type excites you most?",
    answers: ["Single-family homes", "Condos/Townhomes", "Multi-family", "Waterfront/Unique properties"]
  },
  {
    question: "Which lead generation activity do you prefer?",
    answers: ["Open houses & events", "Social media/online marketing", "Sphere & referrals", "Investors & networking"]
  },
  {
    question: "Which area of the Treasure Coast do you want to focus on?",
    answers: ["Port St. Lucie", "Stuart/Palm City", "Fort Pierce/Hutchinson Island", "All of the above"]
  },
  {
    question: "Which KW system do you want to master for lead gen?",
    answers: ["Command SmartPlans", "Social Media Campaigns", "Open House System", "Agent-to-Agent Referrals"]
  }
];

// Niche outcomes
const niches = {
  "First-time buyers": {
    title: "First-Time Buyer Specialist",
    description: [
      "Create a SmartPlan for nurturing buyers new to the process.",
      "Host first-time buyer workshops or webinars monthly.",
      "Leverage social media to share 'how-to-buy' content.",
      "Build lender partnerships to simplify pre-approvals.",
      "Book a strategy session to create your step-by-step plan."
    ]
  },
  "Luxury buyers": {
    title: "Luxury & Lifestyle Expert",
    description: [
      "Focus on waterfront, golf, or gated communities.",
      "Attend luxury open houses and preview high-end listings.",
      "Build a professional Instagram or LinkedIn presence.",
      "Network with luxury vendors and stagers.",
      "Book a strategy session to elevate your market presence."
    ]
  },
  "Investors": {
    title: "Investment & ROI Advisor",
    description: [
      "Learn local cap rates and cash flow calculations.",
      "Attend networking events with local investors.",
      "Leverage KW Command to tag and follow investor contacts.",
      "Share market reports and potential ROI opportunities.",
      "Book a strategy session to structure your investor plan."
    ]
  },
  "Vacation/second-home buyers": {
    title: "Vacation & Lifestyle Market Pro",
    description: [
      "Highlight waterfront and seasonal properties.",
      "Learn STR (short-term rental) rules and HOA guidelines.",
      "Market listings to out-of-town buyers via social media.",
      "Create relocation SmartPlans with lifestyle guides.",
      "Book a strategy session to maximize seasonal lead flow."
    ]
  }
};

// Elements
const quizContainer = document.getElementById("quiz");
const progressBar = document.getElementById("progress-bar");
const resultContainer = document.getElementById("result");
const emailCapture = document.getElementById("email-capture");
const emailInput = document.getElementById("email");
const submitEmailBtn = document.getElementById("submit-email");

let currentQuestion = 0;
let selectedAnswers = [];
let userNiche = "";

function startQuiz() {
  showQuestion();
  updateProgress();
}

function showQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.answers.map((a, i) => 
      `<button class="answer-btn" onclick="selectAnswer('${a}')">${a}</button>`
    ).join("")}
  `;
}

function selectAnswer(answer) {
  selectedAnswers.push(answer);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    updateProgress();
    showQuestion();
  } else {
    showResults();
  }
}

function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showResults() {
  // Determine niche based on first answer
  userNiche = niches[selectedAnswers[0]];
  progressBar.style.width = "100%";

  resultContainer.innerHTML = `
    <h2>🎉 Quiz Complete!</h2>
    <h3>Your niche is: ${userNiche.title}</h3>
    <p>Here’s your recommended action plan:</p>
    <ul>
      ${userNiche.description.map(step => `<li>${step}</li>`).join("")}
    </ul>
    <p>Enter your email to receive your full plan & strategy session link:</p>
  `;

  quizContainer.style.display = "none";
  emailCapture.style.display = "block";
}

// Email capture and send to Google Apps Script
submitEmailBtn.addEventListener("click", () => {
  const email = emailInput.value;
  if (!email) return alert("Please enter an email.");

  fetch("YOUR_WEBHOOK_URL_HERE", {https://script.google.com/macros/s/AKfycbxm8dnhO5QknzfnR5MP0BSdJuonMwfg4i99Vd4jJ6UzzQtylcvwlE3iDjG2m-zZDro2/exec
    method: "POST",
    body: JSON.stringify({
      email: email,
      niche: userNiche.title,
      answers: selectedAnswers
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(data => {
    emailCapture.innerHTML = `
      <h3>✅ Email sent!</h3>
      <p>Check your inbox for your full action plan and strategy session link.</p>
    `;
  }).catch(() => {
    alert("Error sending email. Please try again.");
  });
});

startQuiz();
