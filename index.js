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
    description: `
      You thrive helping new buyers navigate their first purchase!  
      **Action Steps:**  
      - Create a first-time buyer guide using Command.  
      - Host monthly homebuyer workshops or webinars.  
      - Partner with lenders for first-time buyer programs (like Hometown Heroes).  
      - Set up SmartPlans to nurture leads automatically.
    `
  },
  {
    type: "Luxury Agent",
    description: `
      You shine in high-end markets where personal branding and relationships matter.  
      **Action Steps:**  
      - Build a polished, KW-branded luxury listing presentation.  
      - Attend high-end networking and charity events.  
      - Showcase listings with professional staging, photos, and video tours.  
      - Use Command to track luxury referrals and repeat clients.
    `
  },
  {
    type: "Investor Specialist",
    description: `
      You’re numbers-driven and love the strategy behind real estate investments.  
      **Action Steps:**  
      - Learn to analyze ROI, cap rates, and cash flow using MLS & Command reports.  
      - Create a recurring SmartPlan for investors to share new opportunities.  
      - Network with property managers and contractors for added value.  
      - Use market stats in your social media to attract repeat investors.
    `
  },
  {
    type: "Downsizing & 55+ Specialist",
    description: `
      You excel with clients going through major life transitions.  
      **Action Steps:**  
      - Build relationships with 55+ communities and retirement planners.  
      - Offer a concierge move service including decluttering and movers.  
      - Use Command tags to track past clients for referrals.  
      - Host downsizing workshops and highlight senior-friendly features in listings.
    `
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
    <h2>🎉 Quiz Complete!</h2>
    <h3>Your Real Estate Niche Is:</h3>
    <h2 style="color:#c41e3a">${result.type}</h2>
    <p>${result.description}</p>
  `;
  resultContainer.classList.remove('hidden');
  quizContainer.innerHTML = "";

  // Send to Google Sheets
  fetch("YOUR_GOOGLE_SHEET_WEBHOOK_URL", {
    method: "POST",
    body: JSON.stringify({ email: email, result: result.type }),
    headers: { "Content-Type": "application/json" }
  });
}

loadQuestion();
