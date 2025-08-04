document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz");
    const progressBar = document.getElementById("progress-bar");
    const resultContainer = document.getElementById("result");
    const emailContainer = document.getElementById("email-capture");

    const webhookURL = "YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL"; // Replace with your Apps Script webhook

    const questions = [
        {
            question: "Who do you most enjoy working with?",
            options: ["First-Time Homebuyers", "Luxury Buyers", "Investors", "Sellers Downsizing", "Relocation Clients"]
        },
        {
            question: "Which transaction type excites you the most?",
            options: ["Helping someone buy", "Listing and marketing a home", "Helping investors build wealth", "Guiding seniors or downsizers", "Assisting out-of-town buyers"]
        },
        {
            question: "Where do most of your current leads come from?",
            options: ["SOI / Referrals", "Open Houses", "Online Leads / Social Media", "Agent-to-Agent Referrals", "Networking / Community Events"]
        },
        {
            question: "Which marketing strategy do you prefer?",
            options: ["Social Media & Video", "Luxury Print Marketing", "Investment Analysis Reports", "Community Events & Workshops", "Digital Ads & Landing Pages"]
        },
        {
            question: "Which KW model do you want to lean into most?",
            options: ["Leads", "Listings", "Leverage", "Referrals", "Marketing"]
        }
    ];

    const resultsMap = {
        "First-Time Homebuyers": {
            title: "Your Niche is: First-Time Homebuyers",
            summary: "You're passionate about helping new buyers achieve homeownership.",
            actionPlan: [
                "Host monthly first-time buyer workshops",
                "Create a simple 'Steps to Buy' guide",
                "Leverage social media with educational content",
                "Add a SmartPlan for nurture follow-ups"
            ]
        },
        "Luxury Buyers": {
            title: "Your Niche is: Luxury Buyers",
            summary: "You thrive in high-end markets where service and presentation are key.",
            actionPlan: [
                "Tour luxury listings weekly to stay market-savvy",
                "Build relationships with stagers and photographers",
                "Enhance your online presence with polished branding",
                "Offer exclusive property previews and private showings"
            ]
        },
        "Investors": {
            title: "Your Niche is: Investors",
            summary: "You’re data-driven and love helping clients build wealth through real estate.",
            actionPlan: [
                "Analyze cash flow and ROI for local properties",
                "Create a quarterly investor newsletter",
                "Connect with property managers and contractors",
                "Offer market trend updates and rental projections"
            ]
        },
        "Sellers Downsizing": {
            title: "Your Niche is: Downsizing Sellers",
            summary: "You excel at guiding clients through life transitions and simplified living.",
            actionPlan: [
                "Create a 'Downsizing Made Simple' checklist",
                "Host a community seminar on rightsizing",
                "Offer complimentary home valuations",
                "Network with local senior communities"
            ]
        },
        "Relocation Clients": {
            title: "Your Niche is: Relocation Clients",
            summary: "You’re the go-to agent for clients moving into your market.",
            actionPlan: [
                "Develop a relocation guide for your city",
                "Connect with HR departments for referrals",
                "Highlight local lifestyle perks online",
                "Build agent-to-agent referral relationships"
            ]
        }
    };

    let currentQuestion = 0;
    let selectedAnswers = [];

    function showQuestion() {
        quizContainer.innerHTML = `
            <h3>${questions[currentQuestion].question}</h3>
            ${questions[currentQuestion].options.map((opt, idx) => 
                `<button class="option-btn" data-value="${opt}">${opt}</button>`
            ).join('')}
        `;

        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                selectedAnswers.push(btn.dataset.value);
                currentQuestion++;
                updateProgressBar();
                if (currentQuestion < questions.length) {
                    showQuestion();
                } else {
                    captureEmail();
                }
            });
        });
    }

    function updateProgressBar() {
        const progress = ((currentQuestion) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        if (currentQuestion === questions.length) progressBar.style.width = "100%";
    }

    function captureEmail() {
        quizContainer.innerHTML = "";
        emailContainer.innerHTML = `
            <h3>Enter your email to see your results & get your action plan!</h3>
            <input type="email" id="userEmail" placeholder="you@example.com" required>
            <button id="submitEmail">See My Results</button>
        `;

        document.getElementById("submitEmail").addEventListener("click", () => {
            const email = document.getElementById("userEmail").value;
            if (!email) return alert("Please enter your email");

            const niche = determineResult();
            const resultData = resultsMap[niche];

            displayResult(resultData);
            sendToWebhook(email, niche, resultData);
        });
    }

    function determineResult() {
        const counts = {};
        selectedAnswers.forEach(answer => {
            if (!counts[answer]) counts[answer] = 0;
            counts[answer]++;
        });
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    function displayResult(resultData) {
        emailContainer.innerHTML = "";
        resultContainer.innerHTML = `
            <h2>${resultData.title}</h2>
            <p>${resultData.summary}</p>
            <p>Check your email for a detailed action plan.</p>
        `;
    }

    function sendToWebhook(email, niche, resultData) {
        const payload = {
            email,
            niche,
            summary: resultData.summary,
            actionPlan: resultData.actionPlan.join("\n"),
            strategyLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0-fXO8E-zSCfb3lW9QiFna-c9Ukqehhs__sWWy5T06OilXj0dr8X5oChk4bjstqfBnHnTz4c-M"
        };

        fetch(webhookURL, {https://script.google.com/macros/s/AKfycby8zRxa4b1UFuYY6oc-SU9b6d5m0XF0jLyMnHM1n0S7xbUd01NsM4gYoQ_g8wsgn3GZ/exec}
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        });
    }

    // Start Quiz
    showQuestion();
    updateProgressBar();
});
