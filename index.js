const quizData = [
  {
    question: "Which type of client do you enjoy working with most?",
    answers: ["First-Time Buyers", "Luxury Buyers", "Investors", "Sellers"]
  },
  {
    question: "Which part of the business excites you?",
    answers: ["Open Houses", "High-End Showings", "Analyzing Deals", "Marketing Listings"]
  },
  {
    question: "What’s your preferred pace?",
    answers: ["Fast & Fun", "High-Touch & Exclusive", "Numbers & Strategy", "Steady & Strategic"]
  }
];

const results = [
  {
    title: "First-Time Buyer Specialist",
    desc: [
      "Host engaging open houses to attract new buyers.",
      "Leverage social media to educate first-time buyers.",
      "Use KW Command to follow up quickly and convert leads."
    ]
  },
  {
    title: "Luxury Home Specialist",
    desc: [
      "Invest in professional photography & video tours.",
      "Build strong relationships with high-end vendors.",
      "Offer white-glove client experiences."
    ]
  },
  {
    title: "Investor Ally",
    desc: [
      "Analyze properties for ROI and cash flow.",
      "Leverage market trends for investor insights.",
      "Build repeat business with portfolio clients."
    ]
  },
  {
    title: "Listing Power Agent",
    desc: [
      "Focus on neighborhood farming and local dominance.",
      "Master your listing presentation for high conversion.",
      "Leverage KW Command to market listings automatically."
    ]
  }
];

let currentQuestion = 0;
let score = [0,0,0,0];

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const progressEl = document.querySelector(".progress");

function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    showResult();
    return;
  }

  const q = quizData[currentQuestion];
  quizEl.innerHTML = `
    <h2>${q.question}</h2>
    ${q.answers.map((ans, i) => `<button onclick="selectAnswer(${i})">${ans}</button>`).join("")}
  `;

  progressEl.style.width = `${(currentQuestion / quizData.length) * 100}%`;
}

function selectAnswer(i) {
  score[i]++;
  currentQuestion++;
  loadQuestion();
}

function showResult() {
  progressEl.style.width = "100%";
  const maxIndex = score.indexOf(Math.max(...score));
  const res = results[maxIndex];

  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <h2>Your Niche Is: ${res.title}</h2>
    <ul>${res.desc.map(step => `<li>${step}</li>`).join("")}</ul>
    <p>Want your full action plan emailed to you?</p>
    <input type="email" id="email" placeholder="Enter your email"/>
    <button onclick="sendEmail('${res.title}', ${JSON.stringify(res.desc)})">Send My Action Plan</button>
    <p><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0-fXO8E-zSCfb3lW9QiFna-c9Ukqehhs__sWWy5T06OilXj0dr8X5oChk4bjstqfBnHnTz4c-M" target="_blank">Book a Strategy Session with Peter Hopkins</a></p>
  `;
}

async function sendEmail(title, steps) {
  const email = document.getElementById("email").value;
  if (!email) return alert("Please enter an email!");

  const data = { email, title, steps };

  await fetch("YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_HERE", {https://script.google.com/macros/s/AKfycby8zRxa4b1UFuYY6oc-SU9b6d5m0XF0jLyMnHM1n0S7xbUd01NsM4gYoQ_g8wsgn3GZ/exec}
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Your full action plan has been emailed to you!");
}

loadQuestion();
