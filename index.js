// ==============================
// KW Treasure Coast Niche Quiz
// ==============================

// QUIZ QUESTIONS
const quizData = [
  {
    question: "Which type of client excites you most?",
    answers: [
      { text: "First-time homebuyers", niche: "First-Time Buyers" },
      { text: "Luxury buyers & sellers", niche: "Luxury Homes" },
      { text: "Investors & flippers", niche: "Investment Properties" },
      { text: "Vacation or seasonal buyers", niche: "Vacation / 2nd Homes" },
      { text: "Relocations & out-of-state buyers", niche: "Relocation Clients" }
    ]
  },
  {
    question: "Which property type are you most drawn to?",
    answers: [
      { text: "Starter homes / condos", niche: "First-Time Buyers" },
      { text: "High-end waterfront or golf community", niche: "Luxury Homes" },
      { text: "Multi-family or income-producing", niche: "Investment Properties" },
      { text: "Beach or seasonal rentals", niche: "Vacation / 2nd Homes" },
      { text: "Suburban single-family", niche: "Relocation Clients" }
    ]
  },
  {
    question: "What type of conversations energize you?",
    answers: [
      { text: "Helping clients envision their first home", niche: "First-Time Buyers" },
      { text: "Showcasing high-end features & lifestyle", niche: "Luxury Homes" },
      { text: "Crunching numbers & ROI", niche: "Investment Properties" },
      { text: "Highlighting local attractions & seasonal perks", niche: "Vacation / 2nd Homes" },
      { text: "Guiding families through a big move", niche: "Relocation Clients" }
    ]
  },
  {
    question: "Which marketing activities do you enjoy most?",
    answers: [
      { text: "Social media tips & homebuyer education", niche: "First-Time Buyers" },
      { text: "Luxury branding & professional photography", niche: "Luxury Homes" },
      { text: "Before-and-after flips & market stats", niche: "Investment Properties" },
      { text: "Community highlights & beachy lifestyle posts", niche: "Vacation / 2nd Homes" },
      { text: "Neighborhood tours & moving tips", niche: "Relocation Clients" }
    ]
  },
  {
    question: "Which KW system or activity excites you most?",
    answers: [
      { text: "Hosting first-time buyer seminars", niche: "First-Time Buyers" },
      { text: "Luxury open houses & KW Luxury tools", niche: "Luxury Homes" },
      { text: "Using Command for investor follow-ups", niche: "Investment Properties" },
      { text: "Creating seasonal referral campaigns", niche: "Vacation / 2nd Homes" },
      { text: "Building a relocation agent referral network", niche: "Relocation Clients" }
    ]
  }
];

// QUIZ STATE
let currentQuestion = 0;
let selectedNiches = {};
let userEmail = "";

// DOM ELEMENTS
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');

// RENDER QUESTION
function showQuestion() {
  const questionData = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <h3>${questionData.question}</h3>
    ${questionData.answers.map((answer, idx) => `
      <button class="answer-btn" onclick="selectAnswer('${answer.niche}')">${answer.text}</button>
    `).join('')}
  `;
  updateProgressBar();
}

// HANDLE ANSWER
function selectAnswer(niche) {
  selectedNiches[niche] = (selectedNiches[niche] || 0) + 1;

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showEmailCapture();
  }
}

// SHOW EMAIL CAPTURE
function showEmailCapture() {
  quizContainer.innerHTML = `
    <h3>Enter your email to see your recommended niche:</h3>
    <input type="email" id="email" placeholder="Your email" required />
    <button onclick="submitQuiz()">See My Niche!</button>
  `;
  updateProgressBar(true);
}

// CALCULATE NICHE RESULT
function calculateNicheResult() {
  let maxCount = 0;
  let bestNiche = "";
  for (let niche in selectedNiches) {
    if (selectedNiches[niche] > maxCount) {
      maxCount = selectedNiches[niche];
      bestNiche = niche;
    }
  }
  return bestNiche || "General Real Estate";
}

// SUBMIT QUIZ
function submitQuiz() {
  userEmail = document.getElementById('email').value;
  const niche = calculateNicheResult();

  // Show result
  resultContainer.innerHTML = `<h2>Your Recommended Niche: ${niche}</h2>
                               <p>We’ll follow up with KW tools to help you dominate this niche.</p>`;

  // Send to Google Sheets
  fetch("YOUR_GOOGLE_SCRIPT_URL_HERE", {
    method: "POST",
    body: JSON.stringify({ email: userEmail, niche: niche }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => console.log("Google Sheet Response:", data))
  .catch(err => console.error("Error sending to Google Sheets:", err));
}

// PROGRESS BAR
function updateProgressBar(complete = false) {
  const percent = complete ? 100 : ((currentQuestion) / quizData.length) * 100;
  progressBar.style.width = percent + "%";
}

// START QUIZ
showQuestion();
