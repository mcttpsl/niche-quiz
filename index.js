const quizQuestions = [
  {
    question: "Where do most of your leads currently come from?",
    answers: [
      { text: "Friends, family, and past clients", type: "sphere" },
      { text: "Open houses and walk-ins", type: "openhouse" },
      { text: "Social media and online marketing", type: "digital" },
      { text: "Agent-to-agent and vendor referrals", type: "referral" }
    ]
  },
  {
    question: "Which activity do you enjoy most?",
    answers: [
      { text: "Calling and catching up with people I know", type: "sphere" },
      { text: "Meeting buyers face-to-face at open houses", type: "openhouse" },
      { text: "Creating online content or ads", type: "digital" },
      { text: "Building partnerships with other agents", type: "referral" }
    ]
  },
  {
    question: "What is your biggest business goal this year?",
    answers: [
      { text: "Stay top-of-mind with my database", type: "sphere" },
      { text: "Capture more buyers in hot neighborhoods", type: "openhouse" },
      { text: "Grow my presence online", type: "digital" },
      { text: "Expand my network for more referrals", type: "referral" }
    ]
  },
  {
    question: "Which tool would you use first?",
    answers: [
      { text: "SmartPlans for follow-up", type: "sphere" },
      { text: "Command Open House app", type: "openhouse" },
      { text: "Facebook/Instagram ads", type: "digital" },
      { text: "Agent-to-agent Facebook groups", type: "referral" }
    ]
  }
];

const resultsData = {
  sphere: {
    title: "Sphere Builder",
    description: "You thrive by nurturing relationships with your sphere of influence.",
    steps: [
      "Upload all contacts into Command with tags",
      "Set up DTD2 SmartPlan follow-up",
      "Schedule quarterly calls and personal notes"
    ]
  },
  openhouse: {
    title: "Open House Pro",
    description: "Hosting events and meeting buyers in person is your strength.",
    steps: [
      "Plan weekly open houses in key neighborhoods",
      "Promote with social media and KW landing pages",
      "Collect sign-ins using the Command Open House app"
    ]
  },
  digital: {
    title: "Digital Marketer",
    description: "You shine by creating online content and attracting leads digitally.",
    steps: [
      "Run monthly Facebook and Instagram ads via Command",
      "Post consistent content and client stories",
      "Use landing pages to capture leads automatically"
    ]
  },
  referral: {
    title: "Referral Networker",
    description: "You excel at building partnerships that generate leads.",
    steps: [
      "Join agent referral networks on Facebook and LinkedIn",
      "Build local vendor relationships for mutual referrals",
      "Send quarterly updates to out-of-area agents"
    ]
  }
};

let currentQuestion = 0;
let scores = { sphere: 0, openhouse: 0, digital: 0, referral: 0 };

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const progressFill = document.getElementById("progress-fill");

function loadQuestion() {
  const q = quizQuestions[currentQuestion];
  quizDiv.innerHTML = `<h3>${q.question}</h3>` +
    q.answers.map((a,i)=>`<button class="answer-btn" onclick="selectAnswer('${a.type}')">${a.text}</button>`).join("");
  
  progressFill.style.width = ((currentQuestion) / quizQuestions.length) * 100 + "%";
}

function selectAnswer(type) {
  scores[type]++;
  currentQuestion++;
  if(currentQuestion < quizQuestions.length){
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector(".quiz-container").classList.add("hidden");
  const resultContainer = document.getElementById("result-container");
  resultContainer.classList.remove("hidden");
  
  const topType = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);
  const result = resultsData[topType];
  
  document.getElementById("result-title").innerText = `Your Niche is: ${result.title}`;
  document.getElementById("result-description").innerText = result.description;
  document.getElementById("action-steps").innerHTML = result.steps.map(s=>`<li>${s}</li>`).join("");

  progressFill.style.width = "100%";

  document.getElementById("submit-btn").addEventListener("click", ()=>{
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    fetch("YOUR_WEB_APP_URL_HERE", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, email,
        resultTitle: result.title,
        resultDescription: result.description,
        actionSteps: result.steps
      })
    }).then(res=>res.json()).then(data=>{
      alert("Your action plan has been emailed!");
    }).catch(err=>{
      console.error(err);
      alert("Error sending email.");
    });
  });
}

loadQuestion();
