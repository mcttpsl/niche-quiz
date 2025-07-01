// App: What’s Your Aligned Niche?
// Tech: React-style logic simplified for static JS with email capture + progress bar

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");

  const questions = [
    {
      question: "What kind of work energizes you the most?",
      options: ["Deals, numbers, and market research", "Creating content and visuals", "Teaching and guiding others", "Networking and hosting", "Organizing systems and tools"],
    },
    {
      question: "Which role best describes your style?",
      options: ["Advisor", "Creator", "Educator", "Connector", "Organizer"],
    },
    {
      question: "What type of clients excite you the most?",
      options: ["Investors / Relocation Buyers", "Small business brands", "New agents or learners", "Local families or community groups", "Busy professionals or teams"],
    },
    {
      question: "What outcome do you love delivering?",
      options: ["Financial growth", "Brand visibility", "Learning / empowerment", "Connections & community", "Efficiency & structure"],
    },
    {
      question: "Which tool would you grab first?",
      options: ["Calculator", "Canva", "Whiteboard", "Event invite list", "Workflow builder"],
    },
  ];

  const outcomes = [
    {
      type: "A",
      title: "Real Estate Strategist",
      description: "You thrive in markets, numbers, and negotiation. Ideal for luxury, investment, or relocation clients.",
    },
    {
      type: "B",
      title: "Creative Brand Builder",
      description: "You excel at storytelling, visuals, and content creation. Perfect for lifestyle brands and marketing pros.",
    },
    {
      type: "C",
      title: "Educator & Coach",
      description: "You love guiding others to success. Great for new agents, entrepreneurs, and those in transition.",
    },
    {
      type: "D",
      title: "Community Connector",
      description: "You shine in people-facing roles. Ideal for networking, outreach, and neighborhood leadership.",
    },
    {
      type: "E",
      title: "Systems & Structure Pro",
      description: "You make things run smoothly. Great for tech, backend ops, and agent support systems.",
    },
  ];

  let step = 0;
  let score = [0, 0, 0, 0, 0]; // A-E scores

  function renderQuestion() {
    const q = questions[step];
    root.innerHTML = `<h2 style="color:#222;font-size:22px">Question ${step + 1} of ${questions.length}</h2>
      <div style="height: 8px; width: 100%; background: #eee; border-radius: 4px; overflow: hidden; margin-bottom: 1rem;">
        <div style="height: 100%; width: ${(100 / questions.length) * step}%; background: #008080;"></div>
      </div>
      <p style="font-size:18px;color:#333">${q.question}</p>
      <div id="options" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;"></div>`;
    const optionsDiv = document.getElementById("options");
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "option-button";
      btn.style.padding = "12px";
      btn.style.border = "1px solid #008080";
      btn.style.borderRadius = "8px";
      btn.style.background = "#f0fdfa";
      btn.style.color = "#008080";
      btn.style.cursor = "pointer";
      btn.style.width = "100%";
      btn.style.maxWidth = "500px";
      btn.style.margin = "0 auto";
      btn.onclick = () => {
        score[i] += 1;
        step++;
        if (step < questions.length) {
          renderQuestion();
        } else {
          renderEmailForm();
        }
      };
      optionsDiv.appendChild(btn);
    });
  }

  function renderEmailForm() {
    root.innerHTML = `<h2>Almost done! 🎉</h2>
      <p>Enter your name and email to see your result:</p>
      <input type="text" id="name" placeholder="Your Name" style="margin-top:1rem;padding:10px;width:100%;max-width:400px;border-radius:6px;border:1px solid #ccc"/><br/>
      <input type="email" id="email" placeholder="Your Email" style="margin-top:1rem;padding:10px;width:100%;max-width:400px;border-radius:6px;border:1px solid #ccc"/><br/>
      <button id="seeResult" style="margin-top:1.5rem;padding:12px 24px;border:none;border-radius:6px;background:#008080;color:#fff;cursor:pointer">See My Result</button>`;

    document.getElementById("seeResult").onclick = () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      if (!name || !email) {
        alert("Please enter both name and email.");
        return;
      }
      console.log("Lead captured:", { name, email }); // Optionally send to Google Form or email service
      showResult();
    };
  }

  function showResult() {
    const maxIndex = score.indexOf(Math.max(...score));
    const result = outcomes[maxIndex];
    root.innerHTML = `<h2>Your Niche: ${result.title}</h2>
      <p>${result.description}</p>
      <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0-fXO8E-zSCfb3lW9QiFna-c9Ukqehhs__sWWy5T06OilXj0dr8X5oChk4bjstqfBnHnTz4c-M" target="_blank">
        <button class="cta" style="margin-top:1.5rem;padding:12px 24px;border:none;border-radius:6px;background:#008080;color:#fff;cursor:pointer">Book a Strategy Session</button>
      </a>`;
  }

  renderQuestion();
});
