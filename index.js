// ===== KW Niche Quiz v2 =====

// Quiz questions and options
const quizData = [
  {
    question: "Who do you most enjoy working with?",
    answers: [
      { text: "First-time home buyers", niche: "firstTime" },
      { text: "Luxury clients", niche: "luxury" },
      { text: "Investors/flippers", niche: "investor" },
      { text: "Relocating families", niche: "relocation" },
      { text: "Home sellers", niche: "listing" }
    ]
  },
  {
    question: "Which activity excites you the most?",
    answers: [
      { text: "Hosting homebuyer workshops", niche: "firstTime" },
      { text: "Touring high-end properties", niche: "luxury" },
      { text: "Analyzing ROI on properties", niche: "investor" },
      { text: "Helping people settle in new cities", niche: "relocation" },
      { text: "Marketing homes to attract offers", niche: "listing" }
    ]
  },
  {
    question: "Where do you see the most opportunity for growth?",
    answers: [
      { text: "Local first-time buyer demand", niche: "firstTime" },
      { text: "Upscale neighborhoods & new builds", niche: "luxury" },
      { text: "Rental and flip market", niche: "investor" },
      { text: "People moving to Treasure Coast", niche: "relocation" },
      { text: "High listing turnover in my area", niche: "listing" }
    ]
  }
];

// Niche descriptions and tips
const nicheInfo = {
  firstTime: {
    title: "First-Time Buyer Specialist",
    description:
      "You thrive helping new buyers enter the market! Your patience and knowledge make you the perfect guide for first-time buyers.",
    tips: [
      "Partner with lenders who offer first-time buyer programs.",
      "Create a first-time homebuyer workshop or webinar.",
      "Use social media to share step-by-step buying tips."
    ]
  },
  luxury: {
    title: "Luxury Homes Expert",
    description:
      "You excel at high-end client experiences. Luxury real estate is about exceptional service, market knowledge, and polished branding.",
    tips: [
      "Develop relationships with luxury builders and stagers.",
      "Focus on high-quality marketing materials and photography.",
      "Attend local networking events for affluent clientele."
    ]
  },
  investor: {
    title: "Investor & Flip Specialist",
    description:
      "You spot profitable opportunities and thrive in the fast-paced world of investments and property flips.",
    tips: [
      "Build a list of active investors and flippers.",
      "Study market trends and ROI opportunities weekly.",
      "Share investment property spotlights in your newsletter."
    ]
  },
  relocation: {
    title: "Relocation & Out-of-State Specialist",
    description:
      "You enjoy helping families relocate, making the transition to a new city seamless and stress-free.",
    tips: [
      "Build relationships with relocation companies and HR reps.",
      "Highlight community guides and area videos on social media.",
      "Offer virtual tours and moving checklists to new clients."
    ]
  },
  listing: {
    title: "Listing & Marketing Pro",
    description:
      "You’re focused on helping sellers achieve top dollar by marketing homes with maximum exposure.",
    tips: [
      "Run neighborhood farming campaigns.",
      "Offer free home valuation landing pages in Command.",
      "Leverage open houses and social media to showcase listings."
    ]
  }
};

// Track quiz progress
let currentQuestion = 0;
let selectedAnswers = {};
const root = document.getElementById("root");

function startQuiz() {
  root.innerHTML = `
    <div class="quiz-container">
      <h2>Find Your KW Niche</h2>
      <div id="progress-container"><div id="progress-bar"></div></div>
      <div id="question-container"></div>
    </div>
  `;
  showQuestion();
}

function showQuestion() {
  const questionData = quizData[currentQuestion];
  const container = document.getElementById("question-container");

  if (!questionData) {
    showResult();
    return;
  }

  updateProgressBar();

  container.innerHTML = `
    <h3>${questionData.question}</h3>
    <div class="answers">
      ${questionData.answers
        .map(
          (answer, index) =>
            `<button onclick="selectAnswer('${answer.niche}')">${answer.text}</button>`
        )
        .join("")}
    </div>
  `;
}

function selectAnswer(niche) {
  selectedAnswers[niche] = (selectedAnswers[niche] || 0) + 1;
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestion) / quizData.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function showResult() {
  const progress = 100;
  document.getElementById("progress-bar").style.width = progress + "%";

  const topNiche = Object.keys(selectedAnswers).reduce((a, b) =>
    selectedAnswers[a] > selectedAnswers[b] ? a : b
  );

  const result = nicheInfo[topNiche];
  root.innerHTML = `
    <div class="quiz-result">
      <h2>🎉 Quiz Complete – Thank You!</h2>
      <h3>${result.title}</h3>
      <p>${result.description}</p>
      <ul>${result.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
    </div>
  `;

  // Send results to Google Sheet
  sendToGoogleSheet(result.title);
}

// Google Sheet webhook
function sendToGoogleSheet(result) {
  const email = prompt("Enter your email to receive your results:");
  if (!email) return;

  fetch(
    "https://script.google.com/macros/s/AKfycbyl8Ar5tx4TSsfRhqkFe_PdN_Qm9xPYC8VK8_thbaLk0zq5q72xyK_lYMrwkWRF-vzX/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, result: result })
    }
  );
}

startQuiz();
