// ========== CONFIGURATION ==========
const GOOGLE_SHEET_WEBHOOK = "YOUR_WEBHOOK_URL_HERE";

// KW Real Estate Niche Quiz Questions
const quizQuestions = [
  {
    question: "Which type of client excites you the most?",
    answers: [
      { text: "First-time homebuyers", niche: "First-Time Buyer Specialist" },
      { text: "Luxury buyers and sellers", niche: "Luxury Specialist" },
      { text: "Investors & flippers", niche: "Investment Specialist" },
      { text: "Relocation or out-of-state buyers", niche: "Relocation Specialist" },
      { text: "Seniors downsizing", niche: "Senior / 55+ Specialist" }
    ]
  },
  {
    question: "What environment do you enjoy working in the most?",
    answers: [
      { text: "Fast-paced city living", niche: "Urban Specialist" },
      { text: "Quiet suburbs and family neighborhoods", niche: "Family Homes Specialist" },
      { text: "Waterfront or vacation areas", niche: "Waterfront / Vacation Specialist" },
      { text: "Farms, land, or acreage", niche: "Land & Rural Specialist" },
      { text: "Condos and townhomes", niche: "Condo Specialist" }
    ]
  },
  {
    question: "What’s your favorite lead generation strategy?",
    answers: [
      { text: "Hosting open houses and community events", niche: "Neighborhood Engagement" },
      { text: "Social media marketing & videos", niche: "Digital Marketing Agent" },
      { text: "Networking with local businesses", niche: "Relationship-Based Agent" },
      { text: "Working my SOI & referrals", niche: "Referral-Focused Agent" },
      { text: "Investor meetups or property tours", niche: "Investor Focused Agent" }
    ]
  },
  {
    question: "Which Keller Williams model resonates with you most?",
    answers: [
      { text: "Leads: I love building my pipeline", niche: "Lead Generation Pro" },
      { text: "Listings: I want to be the neighborhood expert", niche: "Listing Specialist" },
      { text: "Leverage: I want to grow a team", niche: "Team Builder" },
      { text: "Wealth: I want to invest and create passive income", niche: "Investor/Wealth Builder" }
    ]
  },
  {
    question: "How do you want your ideal client to feel when working with you?",
    answers: [
      { text: "Confident they’re making the best decision", niche: "Advisor & Educator" },
      { text: "Excited and stress-free", niche: "Friendly & Fun Agent" },
      { text: "Protected and in safe hands", niche: "Trusted Guide" },
      { text: "Impressed by my market knowledge & results", niche: "Market Expert" }
    ]
  }
];

// Niche Descriptions & Implementation Steps
const nicheDescriptions = {
  "First-Time Buyer Specialist": {
    description: "You thrive helping first-time buyers navigate their first purchase with confidence and ease.",
    steps: ["Host first-time buyer workshops", "Build lender & inspector relationships", "Create a buyer resource guide"]
  },
  "Luxury Specialist": {
    description: "You excel in high-end markets where attention to detail and elevated service matters most.",
    steps: ["Tour luxury open houses weekly", "Develop a high-end social media presence", "Network with local luxury vendors"]
  },
  "Investment Specialist": {
    description: "You are strategic and thrive helping clients maximize ROI through flips, rentals, and multi-family homes.",
    steps: ["Learn local cap rates and ROI calculations", "Attend real estate investor meetups", "Provide market analysis to investors"]
  },
  "Relocation Specialist": {
    description: "You love helping clients relocate with ease, from virtual tours to smooth transitions.",
    steps: ["Partner with relocation companies", "Offer virtual walk-throughs", "Develop a moving guide for out-of-state buyers"]
  },
  "Senior / 55+ Specialist": {
    description: "You excel at guiding seniors in downsizing or finding the perfect retirement community.",
    steps: ["Learn 55+ community rules & HOAs", "Host downsizing seminars", "Network with estate planners"]
  },
  "Neighborhood Engagement": {
    description: "You thrive with local visibility, connecting through open houses and community events.",
    steps: ["Host block parties or home tours", "Door-knock with local market updates", "Partner with local businesses"]
  },
  "Digital Marketing Agent": {
    description: "You attract clients through social media, video marketing, and online content.",
    steps: ["Post 3x weekly on IG & FB", "Run local Facebook ads", "Create short educational videos for buyers & sellers"]
  },
  "Relationship-Based Agent": {
    description: "You are a connector who thrives on building and maintaining strong personal relationships.",
    steps: ["Deliver pop-bys & handwritten notes", "Host client appreciation events", "Track referrals with Command DTD2"]
  },
  "Referral-Focused Agent": {
    description: "You love leveraging your network to drive a referral-based business.",
    steps: ["Join networking & chamber events", "Ask past clients for Google reviews", "Create a referral rewards program"]
  },
  "Investor Focused Agent": {
    description: "You specialize in identifying properties for investors and helping them grow their portfolios.",
    steps: ["Attend foreclosure & auction events", "Analyze multi-family ROI opportunities", "Offer landlord support resources"]
  },
  "Lead Generation Pro": {
    description: "You are all about filling your pipeline and mastering the KW Lead Gen model.",
    steps: ["Schedule daily lead gen time blocks", "Use Command SmartPlans for follow-up", "Track leads with 411 and GPS"]
  },
  "Listing Specialist": {
    description: "You are focused on becoming the go-to listing expert in your market.",
    steps: ["Build a geographic farm", "Send Just Listed/Just Sold mailers", "Host regular open houses"]
  },
  "Team Builder": {
    description: "You see growth through leverage and are ready to lead a high-performing team.",
    steps: ["Define team roles & splits", "Hire an admin to start leveraging tasks", "Create a team value proposition"]
  },
  "Investor/Wealth Builder": {
    description: "You’re focused on building generational wealth and helping clients do the same.",
    steps: ["Acquire your first rental or flip", "Learn tax benefits of investing", "Host wealth-building workshops"]
  },
  "Advisor & Educator": {
    description: "You excel at educating clients and guiding them with clarity and confidence.",
    steps: ["Host buyer & seller webinars", "Create a video series answering FAQs", "Offer personalized consultations"]
  },
  "Friendly & Fun Agent": {
    description: "You create a stress-free, positive, and fun experience for your clients.",
    steps: ["Share fun social media content", "Give memorable client gifts", "Celebrate each transaction milestone"]
  },
  "Trusted Guide": {
    description: "You are known for being reliable, ethical, and the go-to person clients can trust.",
    steps: ["Get more testimonials & reviews", "Stay in touch with past clients", "Create a safety & moving checklist"]
  },
  "Market Expert": {
    description: "You thrive on knowledge and results, positioning yourself as the expert in your market.",
    steps: ["Post monthly market updates", "Learn pricing strategies for listings", "Host a 'State of the Market' event"]
  }
};

let currentQuestion = 0;
let selectedNiches = [];

// ========== INITIALIZE QUIZ ==========
document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("quiz-result");
  const resultTitle = document.getElementById("result-title");
  const resultDescription = document.getElementById("result-description");
  const resultSteps = document.getElementById("result-steps");
  const progressBar = document.getElementById("progress-bar");

  // Start Quiz with Email Capture
  quizContainer.innerHTML = `
    <h3>Enter your email to get your results:</h3>
    <input type="email" id="userEmail" placeholder="you@example.com" required />
    <button id="startQuiz">Start Quiz</button>
  `;

  document.getElementById("startQuiz").addEventListener("click", () => {
    const email = document.getElementById("userEmail").value;
    if (!email) {
      alert("Please enter your email to continue.");
      return;
    }
    localStorage.setItem("quizUserEmail", email);
    showQuestion();
  });

  function showQuestion() {
    const q = quizQuestions[currentQuestion];
    quizContainer.innerHTML = `<h3>${q.question}</h3>`;
    q.answers.forEach((a) => {
      const btn = document.createElement("button");
      btn.textContent = a.text;
      btn.classList.add("quiz-btn");
      btn.addEventListener("click", () => handleAnswer(a.niche));
      quizContainer.appendChild(btn);
    });

    updateProgress();
  }

  function handleAnswer(niche) {
    selectedNiches.push(niche);
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    // Determine top niche
    const topNiche = mostFrequent(selectedNiches);
    const nicheInfo = nicheDescriptions[topNiche];

    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultTitle.textContent = topNiche;
    resultDescription.textContent = nicheInfo.description;
    resultSteps.innerHTML = "";
    nicheInfo.steps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      resultSteps.appendChild(li);
    });

    // Send to Google Sheet
    const email = localStorage.getItem("quizUserEmail");
    fetch(GOOGLE_SHEET_WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, result: topNiche })
    });
  }

  function updateProgress() {
    const progress = ((currentQuestion) / quizQuestions.length) * 100;
    progressBar.style.width = progress + "%";
  }

  function mostFrequent(arr) {
    return arr.sort((a,b) =>
      arr.filter(v => v===a).length - arr.filter(v => v===b).length
    ).pop();
  }
});
