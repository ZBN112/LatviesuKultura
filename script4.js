document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        
            {
              "text": "Kurš ir uzskatāms par pirmo nozīmīgo latviešu kino režisoru, kurš darbojās 20. gadsimta sākumā?",
              "options": ["Sergejs Eizenšteins", "Aleksandrs Hertz", "Laila Pakalniņa", "Herberts Rappaports"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurā gadā tika izveidots Latvijas pirmā pilnmetrāžas filma?",
              "options": ["1924", "1930", "1947", "1956"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāds ir nosaukums filmai, kas saņēma 'Lielo Kristapu' par labāko pilnmetrāžas spēlfilmu 2019. gadā?",
              "options": ["'Dvēseļu putenis'", "'Oļegs'", "'Blakus'", "'Tēvs Nakts'"],
              "correct": 3,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurš kinoteātris Rīgā ir pazīstams kā viens no senākajiem un vēsturiski nozīmīgākajiem?",
              "options": ["Splendid Palace", "Kino Citadele", "Cinema Riga", "Forum Cinemas"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura no šīm Latvijas filmām ir ieguvusi starptautisku atzinību un vairākas balvas ārvalstu filmu festivālos?",
              "options": ["'Melānijas hronika'", "'Četri balti krekli'", "'Mans draugs - nenopietns cilvēks'", "'Es esmu šeit'"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kā sauc Latvijas kinematogrāfistu, kurš ir pazīstams ar savām dokumentālajām filmām par Latvijas dabu?",
              "options": ["Ivars Seleckis", "Uldis Brauns", "Dzintra Geka", "Jānis Cimmermanis"],
              "correct": 2,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāda ir pirmā Latvijas animācijas filma, kas tika radīta?",
              "options": ["'Lote no Izgudrotāju ciema'", "'Ķepu-ķepā'", "'Leģenda par Zaļo jumpravu'", "'Varonis'"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura no šīm personībām ir slavenākais Latvijas kinokritiķis?",
              "options": ["Dita Rietuma", "Agris Redovičs", "Normunds Naumanis", "Viesturs Kairišs"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura no šīm filmām iezīmēja jaunu lappusi Latvijas kino vēsturē, ieviešot modernās kinematogrāfijas elementus?",
              "options": ["'Āboliņš dzīvo'", "'Nāves ēnā'", "'Elpojiet dziļi'", "'Is it Easy to be Young?'"],
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
  