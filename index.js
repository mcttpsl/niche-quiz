const WEBHOOK_URL = "PASTE_YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

// Sample quiz
const questions = [
  {
    question: "Which client type excites you the most?",
    answers: ["First-time buyers", "Luxury buyers", "Investors", "Vacation home buyers"],
    scores: [0,1,2,3]
  },
  {
    question: "Which type of property do you enjoy marketing?",
    answers: ["Starter homes", "High-end estates", "Multi-family / rentals", "Waterfront or resort homes"],
    scores: [0,1,2,3]
  },
  {
    question: "Which part of the process do you love?",
    answers: ["Guiding and educating new clients", "Showcasing lifestyle and luxury", "Running the numbers", "Highlighting community lifestyle"],
    scores: [0,1,2,3]
  }
];

const results = [
  {
    title: "First-Time Buyer Specialist",
    description: "You thrive helping new buyers enter the market!",
    actionPlan: [
      "Host monthly first-time buyer seminars.",
      "Create educational social media content.",
      "Use KW Command SmartPlans for nurturing leads."
    ]
  },
  {
    title: "Luxury Home Expert",
    description: "You shine in marketing and selling high-end homes.",
    actionPlan: [
      "Join KW Luxury for exclusive tools.",
      "Network at local luxury events.",
      "Focus on high-quality listing photos & videos."
    ]
  },
  {
    title: "Investor Specialist",
    description: "You excel at helping investors find opportunities.",
    actionPlan: [
      "Learn to run cash flow and ROI analyses.",
      "Connect with local investor groups.",
      "Leverage KW Command to track repeat clients."
    ]
  },
  {
    title: "Vacation & Lifestyle Specialist",
    description: "You love helping buyers find their dream getaways.",
    actionPlan: [
      "Highlight lifestyle-focused marketing in listings.",
      "Develop social media content showcasing the area.",
      "Partner with local tourism boards."
    ]
  }
];

let currentQuestion = 0;
let scores = [0,0,0,0];

const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  answersDiv.innerHTML = "";
  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(q.scores[i]);
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(scoreIndex) {
  scores[scoreIndex]++;
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  updateProgress();
  if(currentQuestion < questions.length){
    loadQuestion();
    nextBtn.classList.add("hidden");
  } else {
    showResult();
  }
});

function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function showResult() {
  document.getElementById("quiz-content").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  const bestIndex = scores.indexOf(Math.max(...scores));
  const result = results[bestIndex];

  document.getElementById("niche-title").textContent = result.title;
  document.getElementById("niche-description").textContent = result.description;
  
  const actionList = document.getElementById("action-plan");
  actionList.innerHTML = "";
  result.actionPlan.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    actionList.appendChild(li);
  });
}

// Email submit
document.getElementById("email-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const bestIndex = scores.indexOf(Math.max(...scores));
  const result = results[bestIndex];

  fetch(WEBHOOK_URL, {https://script.google.com/macros/s/AKfycbxqnnP-qBerr50Vv07_TrCNSquP0Qp2sdK_yncSioZOKj65JSfTCiol_ugDgLEXFtgc/exec
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      result: result.title,
      actionPlan: result.actionPlan.map(s => `<li>${s}</li>`).join("")
    })
  }).then(() => {
    alert("Your action plan has been emailed!");
  });
});

// Load first question
loadQuestion();
updateProgress();
