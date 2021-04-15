(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `Your Score is : ${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
      },
      correctAnswer: "c",
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm",
      },
      correctAnswer: "c",
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint",
      },
      correctAnswer: "d",
    },

    {
        question: "Which of the following is not JavaScript Data Types?",
        answers: {
          a: "Undefined",
          b: "Number",
          c: "Boolean",
          d: "Float",
        },
        correctAnswer: "d",
      },
      {
        question: "Which company developed JavaScript?",
        answers: {
          a: "Netscape",
          b: "Bell Labs",
          c: "Sun Microsystems",
          d: "IBM",
        },
        correctAnswer: "a",
      },

      {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
          a: "script",
          b: "head",
          c: "meta",
          d: "style",
        },
        correctAnswer: "a",
      },

      {
        question: "Which of the following is correct about features of JavaScript?",
        answers: {
          a: "It can not Handling dates and time.",
          b: "JavaScript is a object-based scripting language.",
          c: "JavaScript is not interpreter based scripting language.",
          d: "All of the above",
        },
        correctAnswer: "b",
      },

      {
        question: "What is the correct syntax for referring to an external script called LFC.JS?",
        answers: {
          a: "script src='LFC.js'",
          b: "script source='LFC.js'",
          c: "script ref='LFC.js'",
          d: "script type='LFC.js'",
        },
        correctAnswer: "a",
      },

      {
        question: "Which of the following is not Javascript frameworks or libraries?",
        answers: {
          a: "Polymer",
          b: "Meteor",
          c: "Cassandra",
          d: "jQuery",
        },
        correctAnswer: "c",
      },

      {
        question: "What is the original name of JavaScript?",
        answers: {
          a: "LiveScript",
          b: "EScript",
          c: "Mocha",
          d: "JavaScript",
        },
        correctAnswer: "c",
      },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
