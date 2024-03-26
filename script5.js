document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        
            {
              "text": "Kurā Latvijas svētkā ir tradīcija lekt pāri ugunskuram, lai attīrītos un iegūtu spēku?",
              "options": ["Līgo svētki", "Meteņi", "Ziemassvētki", "Mārtiņi"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kā sauc tradicionālo Latvijas rotu, kas simbolizē dzīvības un saules enerģiju?",
              "options": ["Sakta", "Namejs gredzens", "Lielvārdes josta", "Krūšu rotas"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura no šīm ir sena latviešu tradīcija, kas tiek praktizēta ziemas saulgriežos, lai veicinātu auglību un labklājību?",
              "options": ["Pūķu laišana", "Bobu vārīšana", "Mumming", "Ledus peldēšana"],
              "correct": 2,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura Latvijas pilsēta ir slavena ar savu gadskārtējo keramikas tirgu?",
              "options": ["Rundāle", "Kuldīga", "Sigulda", "Cēsis"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāds ir tradicionālais latviešu mūzikas instruments, ko plaši izmanto tautas mūzikā?",
              "options": ["Kokle", "Dūda", "Ģitāra", "Bungas"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura latviešu tradīcija iezīmē pavasara ierašanos un ziemas aizdzīšanu?",
              "options": ["Metenis", "Līgo", "Mārtiņdiena", "Jāņi"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāda ir sena Latvijas amatniecības forma, kas ietver vilnas dzijas pīšanu un adīšanu?",
              "options": ["Audējdarbi", "Keramika", "Tēlniecība", "Metināšana"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kā sauc Latvijā plaši svinēto svētku dienu, kas veltīta sievietēm un mātēm?",
              "options": ["Sieviešu diena", "Mātes diena", "Starptautiskā sieviešu diena", "Valentīna diena"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāds tradicionāls ēdiens ir populārs Latvijā Ziemassvētku vakariņās?",
              "options": ["Pīrāgi", "Zirņi ar speķi", "Kūpināta zivs", "Pelēkie zirņi ar šķiņķi"],
              "correct": 3,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurā no šiem Latvijas tradicionālajiem pasākumiem tiek godināta gaismas un uguns nozīme?",
              "options": ["Staro Rīga", "Līgo svētki", "Jāņi", "Meteņi"],
              "correct": 0,
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
  