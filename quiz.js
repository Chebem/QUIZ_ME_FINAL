document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('start-quiz');
    const quizPopup = document.getElementById('quiz-popup');
    const closeBtn = document.querySelector('.close');
    const quizForm = document.getElementById('quiz-form');
    const downloadResultsBtn = document.getElementById('download-results');
    
  
    const questions = [
        {
            question: "What is Artificial Intelligence (AI)?",
            image:"airtifcLA INTELLIGENCE.png",
            options: [
                "A type of human intelligence",
                "Simulation of human intelligence in machines",
                "An advanced form of data processing"
            ],
            correct: 1
        },
        {
            question: "What does Machine Learning (ML) involve?",
            image:"machine learning 2.png",
            options: [
                "Programming explicit rules",
                "Training algorithms to learn from data",
                "Human-computer interaction"
            ],
            correct: 1
        },
        {
            question: "Which of the following is a commonly used programming language for AI?",
            image:"htl.jpg",
            options: [
                "HTML",
                "Python",
                "CSS"
            ],
            correct: 1
        },
        {
            question: "What is the purpose of Natural Language Processing (NLP)?",
            image:"nlp.png",
            options: [
                "To process natural resources",
                "To enable machines to understand and respond to human language",
                "To develop natural-looking user interfaces"
            ],
            correct: 1
        },
        {
            question: "What does a neural network consist of?",
            image:"Chart-What-is-Deep-Learning.jpg",
            options: [
                "A series of binary decisions",
                "Layers of interconnected nodes",
                "A set of logical rules"
            ],
            correct: 1
        },
        {
            question: "What is a common application of computer vision?",
            image:"difference between machine learning and deep learning.png",
            options: [
                "Image and video analysis",
                "Audio processing",
                "Text summarization"
            ],
            correct: 0
        },
        {
            question: "What is reinforcement learning?",
            image:"Chart-What-is-Deep-Learning.jpg",
            options: [
                "A type of supervised learning",
                "Learning through rewards and punishments",
                "A form of unsupervised learning"
            ],
            correct: 1
        },
        {
            question: "Which AI concept involves learning from labeled data?",
            image:"difference between machine learning and deep learning.png",
            options: [
                "Unsupervised learning",
                "Reinforcement learning",
                "Supervised learning"
            ],
            correct: 2
        },
        {
            question: "What is a chatbot?",
            image:"robo.png",
            options: [
                "A robot that performs physical tasks",
                "A computer program that simulates human conversation",
                "A device used for home automation"
            ],
            correct: 1
        },
        {
            question: "What does the Turing Test evaluate?",
            image:"turing.png",
            options: [
                "The speed of a computer",
                "The intelligence of a machine",
                "The efficiency of an algorithm"
            ],
            correct: 1
        }
    ];
    
  
    let currentQuestionIndex = 0;
    let score = 0;
    let answers = [];
  
    function loadQuestion(index) {
        const questionData = questions[index];
        quizForm.innerHTML = `
            <div class="quiz-question active">
            <img src="${questionData.image}" alt="Question Image" class="question-image">
                <p>${index + 1}. ${questionData.question}</p>
                <div class="options">
                    ${questionData.options.map((option, i) => `
                        <label>
                            <input type="radio" name="option" value="${i}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
                <button type="button" class="submit-btn">Submit</button>
            </div>
        `;
    }
    
    function handleOptionSubmission() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const selectedIndex = parseInt(selectedOption.value);
            handleAnswer(selectedIndex); // Call handleAnswer with the selected option index
        } else {
            alert('Please select an option before submitting.');
        }
    }
    
    
    function handleOptionButtonClick(event) {
        const submitButton = event.target.closest('.submit-btn');
        if (submitButton) {
            handleOptionSubmission(); // Call handleOptionSubmission when the submit button is clicked
        }
    }
    

    function handleAnswer(selectedIndex) {
        const questionData = questions[currentQuestionIndex];
        answers.push({
            question: questionData.question,
            selectedAnswer: questionData.options[selectedIndex],
            correctAnswer: questionData.options[questionData.correct],
            isCorrect: selectedIndex == questionData.correct
        });

        if (selectedIndex == questionData.correct) {
            score++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        quizForm.innerHTML = `
            <div class="quiz-question active">
                <p>Quiz Completed!</p>
                <p>Your score is: ${score} / ${questions.length}</p>
            </div>
        `;
        downloadResultsBtn.style.display = 'block';
    }

    function downloadResults() {
        const results = {
            score: score,
            totalQuestions: questions.length,
            answers: answers
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "quiz_results.txt");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    startQuizBtn.addEventListener('click', () => {
        quizPopup.style.display = 'flex';
        loadQuestion(currentQuestionIndex);
    });

    closeBtn.addEventListener('click', () => {
        quizPopup.style.display = 'none';
    });

    downloadResultsBtn.addEventListener('click', downloadResults);
       
    
    // Attach event listener to quizForm to capture clicks on option buttons
        quizForm.addEventListener('click', handleOptionButtonClick);


  
});
