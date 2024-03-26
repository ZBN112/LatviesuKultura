document.addEventListener('DOMContentLoaded', function () {
    const questions = [
                {
                  "text": "Kura no šīm tradicionālajām Latvijas mūzikas instrumentu grupām ietver kokles, dūdas un stabules?",
                  "options": ["Kurpnieki", "Līgo", "Dziedātāji", "Pūtēji"],
                  "correct": 0,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kā sauc Latvijas folkloras dziesmu un deju svētku vadošo koru, kas ieguvis ierakstu Guinessa rekordu grāmatā?",
                  "options": ["Jāzeps Vītols", "Dziesmu svētku koris", "Latvijas Radio koris", "Sōla"],
                  "correct": 1,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kura no šīm mūzikas grupām ir pirmā Latvijas grupa, kas piedalījusies Eirovīzijas dziesmu konkursā?",
                  "options": ["Brainstorm", "Prāta vētra", "Instrumenti", "Pienvedēja piedzīvojumi"],
                  "correct": 0,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kura no šīm Latvijas pilsētām ir pazīstama ar savu mūzikas festivālu 'Positivus'?",
                  "options": ["Rīga", "Jūrmala", "Liepāja", "Ventspils"],
                  "correct": 2,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kura no šīm Latvijas mūzikas grupām ir ieguvusi prestižo Latvijas Mūzikas ierakstu gada balvu 'Zelta mikrofons'?",
                  "options": ["Prāta vētra", "Instrumenti", "Brainstorm", "Pienvedēja piedzīvojumi"],
                  "correct": 1,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kā sauc Latvijas rakstnieka Jāņa Poruķa komponēto un diriģēto valsts himnu?",
                  "options": ["Gaismas pils", "Dievs, svētī Latviju!", "Viena dziesma", "Dzimtene"],
                  "correct": 1,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kura no šīm Latvijas klasiskās mūzikas komponistēm ir pazīstama ar savu operu 'Pēteris un Nils'?",
                  "options": ["Emīlija Dārziņa", "Jāzeps Vītols", "Emīls Dārziņš", "Ādams Dreimanis"],
                  "correct": 0,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kura no šīm Latvijas dziedātājām ir ieguvusi godalgas starptautiskajās mūzikas konkursos, ieskaitot 'Viņa iekļuva Vecrīgas Jāņos'?",
                  "options": ["Līgo", "Lauris Reiniks", "Marģeris Zariņš", "Liene Āboliņa"],
                  "correct": 3,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kura no šīm Latvijas mūzikas grupām ir pazīstama ar savu eksperimentālo un alternatīvo mūziku, apvienojot elektroakustiskos un tradicionālos instrumentus?",
                  "options": ["Instrumenti", "Brainstorm", "Pienvedēja piedzīvojumi", "Prāta vētra"],
                  "correct": 0,
                  "image": "path/to/image.jpg"
                },
                {
                  "text": "Kā sauc Latvijas teātra režisoru un mūziķi, kas savās izrādēs bieži apvieno mūziku ar vizuālo mākslu?",
                  "options": ["Andris Grīnbergs", "Alvis Hermanis", "Viesturs Meikšāns", "Mārtiņš Eihe"],
                  "correct": 3,
                  "image": "path/to/image.jpg"
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
  