const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load user's answers from session storage if available
const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};

// Function to render the quiz questions
function renderQuestions() {
  questionsElement.innerHTML = ''; // Clear existing content
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement('div');
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement('input');
      choiceElement.setAttribute('type', 'radio');
      choiceElement.setAttribute('name', `question-${i}`);
      choiceElement.setAttribute('value', choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute('checked', true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Event listener to save user's progress in session storage
questionsElement.addEventListener('change', (e) => {
  const name = e.target.name;
  const value = e.target.value;
  const questionIndex = parseInt(name.split('-')[1]);
  userAnswers[questionIndex] = value;
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
});

// Event listener for the submit button
submitButton.addEventListener('click', () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  const scoreMessage = `Your score is ${score} out of 5.`;
  scoreElement.textContent = scoreMessage;
  localStorage.setItem('score', score);
});

// Render the questions on page load
renderQuestions();

// Display score if quiz is already completed
const savedScore = localStorage.getItem('score');
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}
