const form = document.getElementById('quiz-form');
const questions = document.querySelectorAll('.question');
const progress = document.getElementById('progress');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const actionStepsList = document.getElementById('action-steps');
const strategyLink = document.getElementById('strategy-link');

let currentQuestion = 0;

function showQuestion(index) {
  questions.forEach((q, i) => q.classList.toggle('active', i === index));
  progress.style.width = `${((index) / questions.length) * 100}%`;
  document.getElementById('next-btn').textContent =
    index === questions.length - 1 ? 'Submit' : 'Next';
}

showQuestion(currentQuestion);

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
    return;
  }

  // Calculate results (placeholder logic)
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const niche = "Sphere Mastery";
  const description = "You thrive by leveraging your sphere and referrals for growth.";
  const actionSteps = [
    "Schedule weekly calls with your sphere",
    "Send monthly market updates",
    "Host a client appreciation event",
  ];

  // Display results
  resultTitle.textContent = `Your Niche: ${niche}`;
  resultDescription.textContent = description;
  actionStepsList.innerHTML = actionSteps.map(step => `<li>${step}</li>`).join('');
  strategyLink.href = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0-fXO8E-zSCfb3lW9QiFna-c9Ukqehhs__sWWy5T06OilXj0dr8X5oChk4bjstqfBnHnTz4c-M";
  
  form.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  progress.style.width = '100%';

  // Send to Google Apps Script
  fetch('YOUR_WEBHOOK_URL_HERE', {https://script.google.com/macros/s/AKfycbzbVQ940nUBZHV06tBGBosJC3HPRdSJRzpykNK9e_l1nX_nSWpmBDAX5W12t93ZM_G1/exec
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      resultTitle: niche,
      resultDescription: description,
      actionSteps
    })
  });
});
