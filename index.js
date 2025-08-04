const questions = [
  {
    question: "Which type of client do you enjoy most?",
    answers: ["First-Time Buyers", "Luxury Clients", "Investors", "Relocations"]
  },
  {
    question: "Which activity excites you the most?",
    answers: ["Hosting Open Houses", "Negotiating Deals", "Analyzing Markets", "Networking Events"]
  },
  {
    question: "What motivates you most in real estate?",
    answers: ["Helping Families", "Big Closings", "Building Wealth", "Exploring New Markets"]
  }
];

const niches = {
  "First-Time Buyers": {
    title: "First-Time Buyer Specialist",
    description: "You thrive helping new buyers enter the market! Focus on education, open houses, and nurturing leads."
  },
  "Luxury Clients": {
    title: "Luxury Homes Specialist",
    description: "You excel in high-end markets! Build relationships, leverage premium marketing, and network strategically."
  },
  "Investors": {
    title: "Investor Ally",
    description: "You love numbers and deals! Focus on ROI analysis, market trends, and property portfolios."
  },
  "Relocations": {
    title: "Relocation Expert",
    description: "You shine helping clients transition smoothly! Master community tours, virtual consultations, and partnerships."
  }
};

let currentQuestion = 0;
let selectedAnswers = [];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const progressBar = document.getElementById('progress');

function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <h2>${q.question}</h2>
    ${q.answers.map(a => `<button onclick="selectAnswer('${a}')">${a}</button>`).join('')}
  `;

  updateProgress();
}

function selectAnswer(answer) {
  selectedAnswers.push(answer);
  currentQuestion++;
  showQuestion();
}

function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function showResult() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');

  const nicheCount = {};
  selectedAnswers.forEach(a => nicheCount[a] = (nicheCount[a] || 0) + 1);
  const topNiche = Object.keys(nicheCount).reduce((a, b) => nicheCount[a] > nicheCount[b] ? a : b);

  document.getElementById('niche-title').innerText = niches[topNiche].title;
  document.getElementById('niche-description').innerText = niches[topNiche].description;

  progressBar.style.width = "100%";

  // Attach niche result to form for sending
  document.getElementById('emailForm').dataset.niche = topNiche;
}

document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const nicheKey = e.target.dataset.niche;
  const niche = niches[nicheKey];

  fetch("YOUR_GOOGLE_SCRIPT_WEB_APP_URL", {
    method: "POST",
    body: JSON.stringify({ name, email, niche: niche.title, description: niche.description }),
    headers: { "Content-Type": "application/json" }
  }).then(() => {
    alert("Your action plan has been emailed to you!");
  });
});

showQuestion();
