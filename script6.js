document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        
            {
              "text": "Kurš autors ir pazīstams ar latviešu literatūras klasiku 'Lāčplēsis'?",
              "options": ["Rainis", "Andrejs Upīts", "Rūdolfs Blaumanis", "Andrejs Pumpurs"],
              "correct": 3,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura no šīm grāmatām ir Aspazijas dramatiskais darbs?",
              "options": ["'Zelta zirgs'", "'Vaidelote'", "'Mērnieku laiki'", "'Sidraba šķidrauts'"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāds ir Edvarta Virzas slavenā darba 'Straumēni' centrālais tēls?",
              "options": ["Latviešu zemnieks", "Vēstures pētnieks", "Rīgas strādnieks", "Skolotājs"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurā gadā Rainis kļuva par Latvijas Nacionālā teātra galveno režisoru?",
              "options": ["1912", "1921", "1933", "1940"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura no šīm ir Imanta Ziedoņa populārā grāmata bērniem?",
              "options": ["'Krāsainās pasakas'", "'Epifānijas'", "'Dzīves svinēšana'", "'Zaļā grāmata'"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurš no šiem rakstniekiem ir pazīstams ar savu ieguldījumu latviešu detektīvliteratūrā?",
              "options": ["Jānis Poruks", "Māris Bērziņš", "Dace Rukšāne", "Andris Kolbergs"],
              "correct": 3,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kā sauc latviešu literatūras balvu, kas tiek piešķirta par izcilību prozā?",
              "options": ["Latvijas Grāmatu gada balva", "Zelta ābele", "Kilograms kultūras", "Dzintara laiva"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura no šīm grāmatām ir Vizmas Belševicas autobiogrāfiskā triloģija?",
              "options": ["'Bille'", "'Lūgšana par Jāni'", "'Madara'", "'Jūras vārti'"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurš latviešu dzejnieks ir zināms ar savu darbu 'Daugava'?",
              "options": ["Ojārs Vācietis", "Jānis Rainis", "Knuts Skujenieks", "Aleksejs Apīnis"],
              "correct": 2,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāda ir Leona Briedes slavenākā grāmata, kas stāsta par otrā pasaules kara pieredzi?",
              "options": ["'Cilvēka bērns'", "'Is it Easy to be Young?'", "'Zemdegas'", "'Nāves ēnā'"],
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
  