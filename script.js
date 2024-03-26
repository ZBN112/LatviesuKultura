document.addEventListener('DOMContentLoaded', function () {
    const questions = [
            {
              text: "Kurš vēsturisks notikums ievērojami ietekmēja Latvijas virtuves attīstību, ieviešot kartupeli kā pamatproduktu?",
              options: ["Livonijas karš", "Zviedru valdīšana", "Industriālā revolūcija", "Otrais pasaules karš"],
              correct: 1,
              image: "path/to/image.jpg"
            },
            {
              text: "Kuru sastāvdaļu uzskata par Latvijas virtuves 'melnajiem zeltam', bieži atrastu tradicionālās receptēs?",
              options: ["Rupjmaize", "Kūpināta zivs", "Kūpināts speķis", "Meža sēnes"],
              correct: 3,
              image: "path/to/image.jpg"
            },
            {
              text: "Kā sauc tradicionālo Latvijas dzērienu, kas tiek gatavots, fermentējot maizi?",
              options: ["Kvass", "Kefīrs", "Jāņu alus", "Balzams"],
              correct: 0,
              image: "path/to/image.jpg"
            },
            {
              text: "Latvijas Jāņu svētkos, kādu sieru, simbolizējot sauli, tradicionāli gatavo un ēd?",
              options: ["Jāņu siers", "Mājas siers", "Rūgušpiens", "Skābais krējums"],
              correct: 0,
              image: "path/to/image.jpg"
            },
            {
              text: "Kurā gadalaikā ēd 'putraimu grūbas', putru, kas gatavota no īpaša veida graudaugiem?",
              options: ["Ziema", "Pavasaris", "Vasara", "Rudens"],
              correct: 1,
              image: "path/to/image.jpg"
            },
            {
              text: "Kā sauc seno Latvijas ēdienu, kas datējams ar 7. gadsimtu un ir gatavots no miežiem un fermentētiem piena produktiem?",
              options: ["Sklandrausis", "Asins pankūkas", "Biezpiena sieriņš", "Skābputra"],
              correct: 3,
              image: "path/to/image.jpg"
            },
            {
              text: "Kāda unikāla Latvijas kulīnārā tehnika ietver ēdiena gatavošanu zem zemes?",
              options: ["Pirts", "Kūpināšana", "Zemnieku brokastis", "Zirņi ar speķi"],
              correct: 0,
              image: "path/to/image.jpg"
            },
            {
              text: "Kuru mežā un pļavās lasāmo augu Latvijā izmanto gan salātos, gan kā tēju?",
              options: ["Nātres", "Skābene", "Pienenes", "Bērzu lapas"],
              correct: 1,
              image: "path/to/image.jpg"
            }
          ]
          
    
  
    let currentQuestionIndex = 0;
    let score = 0;
    let responses = [];
  
    function displayQuestion() {
      if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
      }
  
      const currentQuestion = questions[currentQuestionIndex];
      document.getElementById('question').textContent = currentQuestion.text;
      const optionsElement = document.getElementById('options');
      optionsElement.innerHTML = '';
      
      currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-primary', 'mb-2'); // Using custom red-outline class
        button.textContent = option;
        button.onclick = () => {
          selectOption(index, currentQuestion.correct);
        };
        optionsElement.appendChild(button);
      });
      
    }
    function selectOption(selectedIndex, correctIndex) {
        const options = document.getElementById('options').children;
        
        // Disable all buttons after a selection to prevent multiple answers
        for (let i = 0; i < options.length; i++) {
            options[i].disabled = true;
        }
    
        if (selectedIndex === correctIndex) {
            // Correct answer, make button green
            options[selectedIndex].classList.remove('btn-outline-primary');
            options[selectedIndex].classList.add('btn-success');
        } else {
            // Incorrect answer, make selected button red
            options[selectedIndex].classList.remove('btn-outline-primary');
            options[selectedIndex].classList.add('btn-danger');
            // Also highlight the correct answer in green
            options[correctIndex].classList.remove('btn-outline-primary');
            options[correctIndex].classList.add('btn-success');
        }
        responses.push({
            question: questions[currentQuestionIndex].text,
            correctAnswer: questions[currentQuestionIndex].options[correctIndex],
            responseCorrect: selectedIndex === correctIndex
        });
        // Wait before moving to the next question to show feedback
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                endGame();
            }
        }, 2000); // Adjust
    }
    
    function proceedToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    }
    

    function endGame() {
      document.getElementById('game').style.display = 'none';
      const summary = responses.map((response, index) => 
        `Jautājums ${index + 1}: ${response.question} <br> Pareizā atbilde: ${response.correctAnswer} <br> Jūsu atbilde: ${response.responseCorrect ? '✅' : '❌'}`).join('<br><br>');
      
      document.getElementById('result').style.display = 'block';
      document.getElementById('score').innerHTML = `Quiz Summary:<br><br>${summary}`;
      
      document.getElementById('restart').onclick = function() {
        currentQuestionIndex = 0;
        score = 0;
        responses = [];
        document.getElementById('result').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        displayQuestion();
      };
    }
  
    displayQuestion();
  });
  