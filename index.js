const quizData = [
  { question: "Which type of client excites you most?",
    options: ["First-time Buyers", "Luxury Sellers", "Investors", "Vacation/Second Homes"] },
  { question: "Which type of property do you enjoy marketing?",
    options: ["Condos/Townhomes", "Luxury Estates", "Fix & Flips", "Waterfront Properties"] },
  { question: "What is your strongest skill?",
    options: ["Client Education", "Networking & Referrals", "Analyzing Deals", "Storytelling & Social Media"] },
  { question: "Where do you want most of your leads to come from?",
    options: ["Open Houses", "Sphere of Influence", "Investor Groups", "Relocation/Referral Networks"] },
  { question: "Which activity sounds most fun to you?",
    options: ["Hosting Homebuyer Seminars", "Touring Luxury Properties", "Evaluating Cash Flow on Deals", "Highlighting Community Lifestyle on Social Media"] },
  { question: "Which challenge are you best at solving?",
    options: ["Guiding nervous buyers", "Winning competitive listings", "Helping clients maximize ROI", "Marketing unique vacation properties"] },
  { question: "Which marketing strategy appeals to you most?",
    options: ["Educational newsletters", "High-end video tours", "Investor reports and deal sheets", "Seasonal lifestyle campaigns"] },
  { question: "Where do you see yourself thriving in 5 years?",
    options: ["Helping families buy first homes", "Specializing in luxury listings", "Working with repeat investors", "Being the go-to agent for second homes"] }
];

let currentQuestion = 0;
let answers = [];

const quizContainer = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const resultDiv = document.getElementById('result');
const nicheResult = document.getElementById('niche-result');
const nicheDescription = document.getElementById('niche-description');
const actionStepsList = document.getElementById('action-steps');

function loadQuestion() {
  quizContainer.innerHTML = `
    <h2>${quizData[currentQuestion].question}</h2>
    ${quizData[currentQuestion].options.map((opt, i) => 
      `<label><input type="radio" name="answer" value="${opt}" /> ${opt}</label><br>`
    ).join('')}
  `;
  updateProgress();
}

function updateProgress() {
  const progress = ((currentQuestion) / quizData.length) * 100;
  progressFill.style.width = `${progress}%`;
}

function calculateNiche(answers) {
  const counts = {};
  answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
  const topAnswer = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  let resultTitle = "";
  let resultDescription = "";
  let actionSteps = [];

  switch(topAnswer) {
    case "First-time Buyers":
    case "Condos/Townhomes":
    case "Client Education":
    case "Open Houses":
      resultTitle = "First-Time Buyer Specialist";
      resultDescription = "You thrive helping new buyers confidently purchase their first home.";
      actionSteps = [
        "Host monthly first-time buyer workshops",
        "Create an email series answering common questions",
        "Partner with a lender to provide pre-approval tips"
      ];
      break;

    case "Luxury Sellers":
    case "Luxury Estates":
    case "High-end video tours":
    case "Touring Luxury Properties":
      resultTitle = "Luxury Listing Agent";
      resultDescription = "You’re drawn to high-end properties and exclusive clientele.";
      actionSteps = [
        "Invest in professional photography and video tours",
        "Network in luxury neighborhoods",
        "Build a strong online luxury presence"
      ];
      break;

    case "Investors":
    case "Fix & Flips":
    case "Investor reports and deal sheets":
    case "Evaluating Cash Flow on Deals":
      resultTitle = "Investor-Focused Agent";
      resultDescription = "You excel at spotting opportunities and working with real estate investors.";
      actionSteps = [
        "Track local ROI and cash flow opportunities",
        "Attend investment meetups and network",
        "Provide clients with market analysis reports"
      ];
      break;

    default:
      resultTitle = "Lifestyle / Vacation Specialist";
      resultDescription = "You love marketing homes that sell the dream lifestyle.";
      actionSteps = [
        "Showcase properties on social media with lifestyle angles",
        "Create community spotlight videos",
        "Target out-of-town and seasonal buyers"
      ];
  }

  return { resultTitle, resultDescription, actionSteps };
}

nextBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer!");
  
  answers.push(selected.value);
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  const { resultTitle, resultDescription, actionSteps } = calculateNiche(answers);

  quizContainer.innerHTML = '';
  nextBtn.style.display = 'none';
  resultDiv.classList.remove('hidden');
  
  nicheResult.textContent = resultTitle;
  nicheDescription.textContent = resultDescription;
  
  actionStepsList.innerHTML = actionSteps.map(step => `<li>${step}</li>`).join('');
  
  document.getElementById('email-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    await fetch('YOUR_GOOGLE_SCRIPT_URL', {
      method: 'POST',
      body: JSON.stringify({ 
        name, 
        email, 
        resultTitle, 
        resultDescription, 
        actionSteps 
      })
    });
    
    alert("Your action plan has been emailed!");
  });
}

loadQuestion();
