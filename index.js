// Niche Quiz App - KW Aligned for Treasure Coast
// Capture email + Google Sheet + Progress Bar

const questions = [
  {
    question: "Which part of real estate excites you the most?",
    options: [
      "Helping first-time homebuyers",
      "Luxury waterfront properties",
      "Investment or rental properties",
      "Working with retirees & relocation"
    ]
  },
  {
    question: "Which Keller Williams model or system do you feel most drawn to?",
    options: [
      "Lead Generation (DTD2, Open Houses, Farming)",
      "Leverage (Building a team or network)",
      "Listings (Marketing & Exposure Strategies)",
      "Wealth-Building (Investing or Referrals)"
    ]
  },
  {
    question: "If you had to spend a day networking, where would you go?",
    options: [
      "Local community events & festivals",
      "High-end golf clubs or yacht clubs",
      "Investor meetups or Chamber of Commerce",
      "55+ communities or HOA socials"
    ]
  },
  {
    question: "Which type of client relationship do you prefer?",
    options: [
      "Guiding and educating clients step by step",
      "Discreet, high-touch, and results-driven",
      "Numbers-focused and strategy sessions",
      "Friendly, neighborly, and community-driven"
    ]
  },
  {
    question: "Which of these marketing activities sounds the most fun?",
    options: [
      "Hosting open houses & posting on social media",
      "Professional photos, drone videos & high-end brochures",
      "Creating investor reports & market analysis emails",
      "Community newsletters, local spotlights & events"
    ]
  }
];

const outcomes = [
  {
    name: "First-Time Buyer / SOI Niche",
    description: "You thrive working with everyday buyers and your SOI. Focus on open houses, DTD2 touches, and education-focused marketing.",
    matchAnswers: [0,0,0,0,0]
  },
  {
    name: "Luxury & Waterfront Niche",
    description: "You’re drawn to high-touch service and elevated marketing. Focus on professional branding, luxury networking, and curated experiences.",
    matchAnswers: [1,1,1,1,1]
  },
  {
    name: "Investor / Data-Driven Niche",
    description: "You love strategy and ROI conversations. Focus on market reports, investor meetups, and a numbers-focused brand.",
    matchAnswers: [2,2,2,2,2]
  },
  {
    name: "Community & 55+ Niche",
    description: "You excel at building trust in close-knit communities. Focus on hyperlocal marketing, events, and nurturing long-term relationships.",
    matchAnswers: [3,3,3,3,3]
  }
];

// Capture form elements
let currentQuestion = 0;
let answers = [];
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const progressBar = document.getElementById("progress");

function loadQuestion() {
  quizContainer.innerHTML = "";
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];

    // Question text
    const questionEl = document.createElement("h2");
    questionEl.textContent = q.question;
    quizContainer.appendChild(questionEl);

    // Options as buttons
    q.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.classList.add("option-btn");
      btn.onclick = () => {
        answers.push(index);
        currentQuestion++;
        updateProgress();
        loadQuestion();
      };
      quizContainer.appendChild(btn);
    });
  } else {
    showEmailCapture();
  }
}

function updateProgress() {
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

function showEmailCapture() {
  quizContainer.innerHTML = `
    <h2>Almost done! Enter your email to see your niche:</h2>
    <input type="email" id="emailInput" placeholder="Your email">
    <button id="submitEmail">See My Niche</button>
  `;

  document.getElementById("submitEmail").onclick = () => {
    const email = document.getElementById("emailInput").value;
    showResult(email);
  };
}

function showResult(email) {
  const tally = answers.reduce((a,b)=>a+b,0)/answers.length;
  let niche;
  if (tally < 0.75) niche = outcomes[0];
  else if (tally < 1.5) niche = outcomes[1];
  else if (tally < 2.5) niche = outcomes[2];
  else niche = outcomes[3];

  quizContainer.innerHTML = `
    <h2>Your Recommended Niche:</h2>
    <h3>${niche.name}</h3>
    <p>${niche.description}</p>
  `;

  sendToGoogleSheet(email, niche.name);
}

function sendToGoogleSheet(email, niche) {
  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: JSON.stringify({email, niche}),
    headers: {"Content-Type": "application/json"}
  }).then(res => console.log("Submitted to Google Sheet"));
}

// Start quiz
loadQuestion();
updateProgress();
