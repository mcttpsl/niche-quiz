// ========== CONFIG ==========
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwZTBJKPhlZTs6ZXT8HpN178OuS5YPyPp7_WeorB63EOtTJqrSjabY0mSt0T3RP7MkE/exec";

// KW-Style Questions
const questions = [
  {
    question: "How would you describe your current real estate focus?",
    options: ["Mostly Buyers", "Mostly Sellers", "Even Mix", "Just Starting Out"]
  },
  {
    question: "What is your #1 source of leads?",
    options: ["Sphere of Influence", "Open Houses", "Online Leads", "I need to build a lead source"]
  },
  {
    question: "How consistent is your follow-up?",
    options: ["Daily & Organized", "I follow up sometimes", "I struggle to stay consistent"]
  },
  {
    question: "Which system do you use the most in your business?",
    options: ["KW Command", "Social Media", "MLS", "I don’t have a system yet"]
  },
  {
    question: "What is your biggest business goal in the next 90 days?",
    options: ["Get More Listings", "Close More Buyers", "Build My Database", "Get Organized"]
  }
];

// Result Outcomes
const results = [
  {
    title: "Your Niche: Database Builder 🗂️",
    description: "You’re ready to grow your business by mastering your database and creating a steady flow of referrals.",
    actionSteps: [
      "Upload and tag all your contacts into Command.",
      "Start using the DTD2 system for weekly touches.",
      "Set up a SmartPlan to nurture your sphere."
    ]
  },
  {
    title: "Your Niche: Listing Specialist 🏡",
    description: "You thrive when helping sellers and are ready to master listing marketing and lead gen.",
    actionSteps: [
      "Host at least 2 open houses per month to find motivated sellers.",
      "Use social media to feature your listings consistently.",
      "Implement a 5-5-4 follow-up plan with seller leads."
    ]
  },
  {
    title: "Your Niche: Buyer Advocate 🔑",
    description: "You love working with buyers and can win big by systemizing follow-up and showings.",
    actionSteps: [
      "Leverage Command to track buyer searches and follow-ups.",
      "Create a weekly social media tip series for buyers.",
      "Offer virtual or in-person buyer consultations regularly."
    ]
  },
  {
    title: "Your Niche: New Agent Explorer 🌱",
    description: "You’re building the foundation of your business—systems and consistency are your best friends.",
    actionSteps: [
      "Shadow top agents in the office and attend all trainings.",
      "Focus on building your database and tagging contacts.",
      "Start a simple weekly routine for lead generation."
    ]
  }
];

let currentQuestion = 0;
let userAnswers = [];
let userName = "";
let userEmail = "";

const app = document.getElementById("quiz-app");

// Load the first screen for name/email
function showWelcomeScreen() {
  app.innerHTML = `
    <h2>KW Real Estate Niche Quiz</h2>
    <p>Find your niche and get a personalized action plan for your business.</p>
    <input id="name" placeholder="Your Name" />
    <input id="email" placeholder="Your Email" />
    <button onclick="startQuiz()">Start Quiz</button>
    <div class="progress-bar"><div class="progress"></div></div>
  `;
}

function startQuiz() {
  userName = document.getElementById("name").value.trim();
  userEmail = document.getElementById("email").value.trim();
  if (!userName || !userEmail) {
    alert("Please enter both your name and email to begin.");
    return;
  }
  currentQuestion = 0;
  userAnswers = [];
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  app.innerHTML = `
    <h3>Question ${currentQuestion + 1} of ${questions.length}</h3>
    <p>${q.question}</p>
    ${q.options.map((opt, i) => `<button onclick="selectAnswer('${opt}')">${opt}</button>`).join("<br>")}
    <div class="progress-bar"><div class="progress" style="width:${((currentQuestion)/questions.length)*100}%"></div></div>
  `;
}

function selectAnswer(answer) {
  userAnswers.push(answer);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function calculateResult() {
  // Simple mapping based on first answer
  const firstAnswer = userAnswers[0];
  if (firstAnswer.includes("Buyers")) return results[2];
  if (firstAnswer.includes("Sellers")) return results[1];
  if (firstAnswer.includes("Even Mix")) return results[0];
  return results[3];
}

function showResults() {
  const result = calculateResult();

  app.innerHTML = `
    <h2>Quiz Complete 🎉</h2>
    <h3>${result.title}</h3>
    <p>${result.description}</p>
    <ul>${result.actionSteps.map(step => `<li>${step}</li>`).join("")}</ul>
    <p><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0-fXO8E-zSCfb3lW9QiFna-c9Ukqehhs__sWWy5T06OilXj0dr8X5oChk4bjstqfBnHnTz4c-M" target="_blank">📅 Book Your Strategy Session</a></p>
    <div class="progress-bar"><div class="progress" style="width:100%"></div></div>
  `;

  sendToGoogleSheet(result);
}

function sendToGoogleSheet(result) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: userName,
      email: userEmail,
      result: result.title,
      answers: userAnswers
    })
  })
    .then(res => res.json())
    .then(data => console.log("Sent to Google Sheet:", data))
    .catch(err => console.error("Error:", err));
}

// Init
showWelcomeScreen();
