const quizData = [
  {
    question: "Which type of client do you enjoy working with most?",
    options: ["First-time homebuyers", "Luxury buyers", "Investors", "Sellers downsizing"]
  },
  {
    question: "Which type of property excites you most?",
    options: ["Single-family homes", "Luxury estates", "Multi-family / Rentals", "Condos or Townhomes"]
  },
  {
    question: "Where do you see the most opportunity in your market?",
    options: ["Affordable starter homes", "High-end neighborhoods", "Growing rental markets", "55+ or retirement communities"]
  },
  {
    question: "Which activity do you enjoy most?",
    options: ["Hosting open houses", "Networking at high-end events", "Analyzing ROI and cash flow", "Helping families transition smoothly"]
  },
  {
    question: "Which describes your ideal work style?",
    options: ["High-energy & people-focused", "Exclusive & referral-based", "Analytical & numbers-driven", "Relationship-driven with repeat clients"]
  }
];

const resultsData = [
  {
    type: "First-Time Buyer Specialist",
    description: "You thrive helping new buyers! Focus on education, first-time buyer programs, and building strong lender relationships."
  },
  {
    type: "Luxury Agent",
    description: "You shine in high-end markets. Build a polished brand, attend networking events, and offer white-glove service."
  },
  {
    type: "Investor Specialist",
    description: "You’re numbers-driven! Focus on cash-flow properties, market stats, and creating repeat investor clients."
  },
  {
    type: "Downsizing & 55+ Specialist",
    description: "You excel with life transitions. Partner with retirement communities, moving services, and create a smooth selling experience."
  }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');

let currentQuestion = 0;
let answers = [];

function loadQuestion() {
  quizContainer.innerHTML = "";
  if (currentQuestion < quizData.length) {
    const q = document.createElement('h2');
    q.textContent = quizData[currentQuestion].question;
    quizContainer.appendChild(q);

    quizData[currentQuestion].options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.onclick = () => selectAnswer(index);
      quizContainer.appendChild(btn);
    });

    updateProgress();
  } else {
    showEmailCapture();
  }
}

function selectAnswer(index) {
  answers.push(index);
  currentQuestion++;
  loadQuestion();
}

function updateProgress() {
  const progress = (currentQuestion / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showEmailCapture() {
  quizContainer.innerHTML = `
    <h2>Enter your email to see your results:</h2>
    <input type="email" id="emailInput" placeholder="Your email">
    <br><br>
    <button onclick="submitEmail()">Submit</button>
  `;
}

function submitEmail() {
  const email = document.getElementById('emailInput').value;
  if (!email) return alert('Please enter a valid email.');

  const dominantAnswer = answers
    .reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {});

  const topAnswer = Object.keys(dominantAnswer).reduce((a,b) => 
    dominantAnswer[a] > dominantAnswer[b] ? a : b
  );

  const result = resultsData[topAnswer];
  resultContainer.innerHTML = `
    <h2>Quiz Complete!</h2>
    <h3>Your Niche: ${result.type}</h3>
    <p>${result.description}</p>
  `;
  resultContainer.classList.remove('hidden');
  quizContainer.innerHTML = "";

  // Send to Google Sheets
  fetch("YOUR_GOOGLE_SHEET_WEBHOOK_URL", {https://script.google.com/macros/s/AKfycby8zRxa4b1UFuYY6oc-SU9b6d5m0XF0jLyMnHM1n0S7xbUd01NsM4gYoQ_g8wsgn3GZ/exec}
    method: "POST",
    body: JSON.stringify({ email: email, result: result.type }),
    headers: { "Content-Type": "application/json" }
  });
}

loadQuestion();
