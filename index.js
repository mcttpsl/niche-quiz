const quizData = [
  {
    question: "Which type of clients do you enjoy working with most?",
    options: ["First-time buyers", "Luxury buyers", "Investors", "Sellers ready to list"]
  },
  {
    question: "What type of real estate activity excites you the most?",
    options: ["Hosting open houses", "Analyzing investment deals", "Luxury home tours", "Helping families relocate"]
  },
  {
    question: "How do you primarily find your clients?",
    options: ["Sphere of influence/referrals", "Social media & online leads", "Investor networks", "Community events & open houses"]
  },
  {
    question: "Which marketing approach fits your style?",
    options: ["Educational content & guides", "High-end photography & video", "Market stats & ROI reports", "Neighborhood farming & postcards"]
  },
  {
    question: "What would your ideal real estate schedule look like?",
    options: ["Flexible and people-focused", "Structured with high-end clients", "Numbers-driven with multiple deals", "Busy with lots of listings"]
  }
];

const niches = {
  "First-time buyers": {
    title: "First-Time Buyer Specialist",
    description: "You thrive when guiding new buyers through the home buying journey.",
    actionSteps: [
      "Create an educational email series for first-time buyers.",
      "Host monthly first-time buyer workshops or webinars.",
      "Build relationships with local lenders for pre-approval support."
    ]
  },
  "Luxury buyers": {
    title: "Luxury Home Expert",
    description: "You shine in high-end, relationship-driven real estate transactions.",
    actionSteps: [
      "Develop a luxury-focused social media presence.",
      "Network with high-income professionals and community leaders.",
      "Offer premium open houses with concierge-style experiences."
    ]
  },
  "Investors": {
    title: "Investor-Focused Agent",
    description: "You excel in analyzing deals and creating wealth opportunities.",
    actionSteps: [
      "Create a monthly market update with ROI insights.",
      "Build relationships with local flippers and landlords.",
      "Offer free investment property evaluations to your database."
    ]
  },
  "Sellers ready to list": {
    title: "Listing Specialist",
    description: "You’re a natural at attracting and converting sellers.",
    actionSteps: [
      "Launch a geographic farming strategy with postcards and door-knocking.",
      "Offer free market evaluations and CMA consultations.",
      "Host neighborhood open house events to meet potential sellers."
    ]
  }
};

const quizContainer = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const actionStepsList = document.getElementById('action-steps');

let currentQuestion = 0;
let answers = [];

function loadQuestion() {
  quizContainer.innerHTML = `
    <h2>${quizData[currentQuestion].question}</h2>
    ${quizData[currentQuestion].options.map((opt, i) => `
      <label class="option">
        <input type="radio" name="answer" value="${opt}"> ${opt}
      </label>
    `).join('')}
  `;
}

function updateProgress() {
  const progress = ((currentQuestion) / quizData.length) * 100;
  progressFill.style.width = progress + '%';
}

nextBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer to continue.");

  answers.push(selected.value);
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
    updateProgress();
  } else {
    showResults();
  }
});

function showResults() {
  const finalAnswer = answers[answers.length - 1];
  const niche = niches[finalAnswer] || niches["First-time buyers"];

  quizContainer.classList.add('hidden');
  nextBtn.classList.add('hidden');
  resultContainer.classList.remove('hidden');

  resultTitle.textContent = `Your Niche: ${niche.title}`;
  resultDescription.textContent = niche.description;
  actionStepsList.innerHTML = niche.actionSteps.map(step => `<li>${step}</li>`).join('');

  // Send results to Google Apps Script
  fetch("YOUR_WEB_APP_URL_HERE", {https://script.google.com/macros/s/AKfycbzbVQ940nUBZHV06tBGBosJC3HPRdSJRzpykNK9e_l1nX_nSWpmBDAX5W12t93ZM_G1/exec
    method: "POST",
    body: JSON.stringify({
      name: prompt("Enter your name to receive your full action plan:"),
      email: prompt("Enter your email:"),
      resultTitle: niche.title,
      resultDescription: niche.description,
      actionSteps: niche.actionSteps
    }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => console.log("Response:", data))
  .catch(err => console.error(err));

  progressFill.style.width = '100%';
}
  
loadQuestion();
updateProgress();
