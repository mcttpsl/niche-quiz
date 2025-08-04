const questions = [
  {
    question: "What type of clients do you enjoy working with most?",
    answers: ["First-time buyers", "Luxury clients", "Investors", "Sellers upgrading"]
  },
  {
    question: "Which activity excites you most?",
    answers: ["Hosting open houses", "Networking with high-net-worth individuals", "Analyzing market trends", "Door knocking & prospecting"]
  },
  {
    question: "What’s your ideal lead source?",
    answers: ["Social media", "Referrals", "Investment groups", "Neighborhood farming"]
  },
  {
    question: "What is your biggest strength?",
    answers: ["Marketing & social media", "Negotiation skills", "Data & numbers", "Local community knowledge"]
  },
  {
    question: "Which KW model do you want to master?",
    answers: ["Ignite & SOI growth", "Luxury & branding", "Investing & wealth building", "Listings & lead gen"]
  }
];

const results = [
  {
    title: "Your Niche: First-Time Buyer Specialist",
    description: [
      "Focus on education-based marketing for buyers.",
      "Host workshops & webinars using KW resources.",
      "Leverage social media & Command SmartPlans.",
      "Follow up using the DTD2 system for long-term growth."
    ]
  },
  {
    title: "Your Niche: Luxury Agent",
    description: [
      "Polish your marketing with high-end visuals and video tours.",
      "Network in affluent neighborhoods and local events.",
      "Build a strong social media presence with Command campaigns.",
      "Explore KW Luxury certification for credibility."
    ]
  },
  {
    title: "Your Niche: Investor-Friendly Agent",
    description: [
      "Identify ROI-driven properties and market data.",
      "Build relationships with investment clubs.",
      "Leverage MLS & Command for market snapshots.",
      "Offer quarterly investment analysis to clients."
    ]
  },
  {
    title: "Your Niche: Listing-Focused Agent",
    description: [
      "Farm your neighborhood using Command & DTD2.",
      "Host consistent open houses to attract sellers.",
      "Offer a polished listing presentation with KW tools.",
      "Leverage Just Listed/Just Sold campaigns."
    ]
  }
];

let currentQuestion = 0;
let answers = [];

const quizEl = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");

function showQuestion() {
  const q = questions[currentQuestion];
  quizEl.innerHTML = `<h2>${q.question}</h2>` + q.answers.map((a, i) =>
    `<label><input type="radio" name="answer" value="${i}"> ${a}</label><br>`
  ).join('');
  nextBtn.classList.remove("hidden");
  updateProgress();
}

function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer");
  answers.push(parseInt(selected.value));
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  progressBar.style.width = "100%";

  const nicheIndex = answers.reduce((a,b) => a+b,0) % results.length;
  const niche = results[nicheIndex];

  quizEl.classList.add("hidden");
  nextBtn.classList.add("hidden");

  resultEl.innerHTML = `
    <h2 class="result-title">${niche.title}</h2>
    <div class="result-actions">
      <ul>${niche.description.map(d => `<li>${d}</li>`).join('')}</ul>
    </div>
    <p>Enter your email to receive your full action plan & strategy session link:</p>
    <input type="text" id="name" placeholder="Your Name"><br>
    <input type="email" id="email" placeholder="Your Email"><br>
    <button onclick="submitLead('${niche.title}', '${niche.description.join(' | ')}')">Get My Plan</button>
  `;
  resultEl.classList.remove("hidden");
}

function submitLead(niche, actions) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  if (!name || !email) return alert("Please enter your name and email");

  fetch("YOUR_WEB_APP_URL", {https://script.google.com/macros/s/AKfycbyX3eWjAHM5CRaTulAacQYQ5JbfAcLoOdYcYrPmnmqfXL5vNZorryvwWFOFeAQl5HKS/exec
    method: "POST",
    body: JSON.stringify({name, email, niche, actions}),
    headers: {"Content-Type": "application/json"}
  }).then(() => {
    alert("Your action plan has been emailed!");
  }).catch(err => console.error(err));
}

showQuestion();
