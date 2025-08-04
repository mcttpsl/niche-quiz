// ===================== CONFIG =====================
const webhookURL = "YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_HERE";

// Questions and answers (sample placeholders)
const questions = [
  {
    question: "Which type of client excites you most?",
    answers: ["First-Time Buyers", "Luxury Buyers", "Investors", "Relocation Clients"]
  },
  {
    question: "Which activity do you enjoy most?",
    answers: ["Hosting Open Houses", "Networking with High-Net-Worth Clients", "Analyzing Deals", "Helping Families Relocate"]
  },
  {
    question: "Which marketing method do you prefer?",
    answers: ["Social Media", "Exclusive Events", "ROI-Driven Ads", "Community Outreach"]
  },
  {
    question: "Which KW model do you align with?",
    answers: ["Ignite", "Luxury", "Commercial", "Referral & Relocation"]
  },
  {
    question: "Your ideal day in real estate includes:",
    answers: ["Meeting New Buyers", "Touring High-End Homes", "Crunching Investment Numbers", "Helping Families Settle In"]
  }
];

// Results mapping
const results = [
  {
    title: "First-Time Buyer Specialist",
    description: "You thrive helping new buyers enter the market!",
    steps: [
      "Host 2+ open houses per month targeting first-time buyers.",
      "Create a buyer guide in Command and send to your SOI.",
      "Leverage social media for buyer tips and testimonials."
    ]
  },
  {
    title: "Luxury Specialist",
    description: "You excel with high-net-worth clients and premium properties.",
    steps: [
      "Tour local luxury properties weekly to build market knowledge.",
      "Network with local professionals and attend luxury events.",
      "Use Command to create high-end listing presentations."
    ]
  },
  {
    title: "Investor Ally",
    description: "You love helping clients grow wealth through real estate investments.",
    steps: [
      "Analyze 2-3 deals weekly and share insights with prospects.",
      "Offer workshops on investment strategies using KW resources.",
      "Build relationships with property managers and contractors."
    ]
  },
  {
    title: "Relocation & Referral Pro",
    description: "You thrive connecting families and clients to new communities.",
    steps: [
      "Partner with KW relocation and referral networks.",
      "Create a relocation guide with local attractions and services.",
      "Stay active in neighborhood social media groups."
    ]
  }
];

let currentQuestion = 0;
let userAnswers = [];
let userEmail = "";

// DOM Elements
const container = document.querySelector(".quiz-container");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const progressBar = document.querySelector("#progress-bar");
const resultContainer = document.querySelector(".result-container");

// Display question
function showQuestion() {
  if (!questions[currentQuestion]) return showResult();

  questionEl.innerHTML = questions[currentQuestion].question;
  answersEl.innerHTML = "";

  questions[currentQuestion].answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => selectAnswer(answer);
    answersEl.appendChild(btn);
  });

  updateProgressBar();
}

function selectAnswer(answer) {
  userAnswers.push(answer);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    askEmail();
  }
}

function askEmail() {
  container.innerHTML = `
    <h2>Almost done! Enter your email to get your full action plan:</h2>
    <input type="email" id="emailInput" placeholder="you@example.com" required>
    <button onclick="finishQuiz()">Get My Results</button>
  `;
  updateProgressBar(100);
}

function finishQuiz() {
  const emailInput = document.querySelector("#emailInput");
  userEmail = emailInput.value.trim();

  if (!userEmail) {
    alert("Please enter your email to receive your results.");
    return;
  }

  showResult();
  sendToGoogleSheet();
}

function showResult() {
  // Determine result based on first answer (simple mapping)
  let resultIndex = 0;
  if (userAnswers[0].includes("Luxury")) resultIndex = 1;
  else if (userAnswers[0].includes("Investors")) resultIndex = 2;
  else if (userAnswers[0].includes("Relocation")) resultIndex = 3;

  const selectedResult = results[resultIndex];

  container.innerHTML = `
    <h2>Your Niche is: ${selectedResult.title}</h2>
    <p>${selectedResult.description}</p>
    <ul>${selectedResult.steps.map(step => `<li>${step}</li>`).join("")}</ul>
    <p style="color:green; font-weight:bold;">✅ Your full action plan has been emailed to you!</p>
  `;

  updateProgressBar(100);
}

function sendToGoogleSheet() {
  // Determine result based on first answer
  let resultIndex = 0;
  if (userAnswers[0].includes("Luxury")) resultIndex = 1;
  else if (userAnswers[0].includes("Investors")) resultIndex = 2;
  else if (userAnswers[0].includes("Relocation")) resultIndex = 3;

  const selectedResult = results[resultIndex];

  fetch(webhookURL, {https://script.google.com/macros/s/AKfycbwQkEn8ns7IFO5FsZMwyzEAYr8S92_gZY7VqOer0o9PUH_wHLx92DOuHQ2xSTs4wRVV/exec
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userEmail,
      title: selectedResult.title,
      steps: selectedResult.steps
    })
  })
  .then(res => res.json())
  .then(data => console.log("Webhook success:", data))
  .catch(err => console.error("Webhook error:", err));
}

function updateProgressBar(forceValue) {
  let percent = forceValue ?? ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

// Start quiz
showQuestion();
