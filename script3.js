document.addEventListener('DOMContentLoaded', function () {
    const questions = [
            {
              "text": "Kurš mākslinieks tiek uzskatīts par latviešu nacionālā romantisma pamatlicēju?",
              "options": ["Janis Rozentāls", "Vilhelms Purvītis", "Johans Valters", "Rūdolfs Blaumanis"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura no šīm pilsētām ir pazīstama ar ikgadējo starptautisko mākslas festivālu 'Mark Rothko'?",
              "options": ["Daugavpils", "Liepāja", "Cēsis", "Ventspils"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kā sauc slaveno Latvijas mākslinieku, kas pazīstams ar saviem abstraktajiem darbiem un emigrēja uz ASV 20. gadsimta vidū?",
              "options": ["Mark Rothko", "Gustavs Klucis", "Valdis Zariņš", "Niklāvs Strunke"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurā gadā Rīga kļuva par Eiropas kultūras galvaspilsētu",
              "options": ["2014", "2012", "2008", "2016"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurš no šiem mākslas darbu veidiem ir īpaši populārs Latvijas Jāņu svētku svinībām?",
              "options": ["Līnijgravīras", "Koka skulptūras", "Sienas gleznojumi", "Metāla darbi"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kura mākslas forma ir īpaši attīstīta Latgalē, izmantojot vietējo mālu un senas tehnikas?",
              "options": ["Stikla pūšana", "Keramika", "Tekstilmāksla", "Eglīšu zīmēšana"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāds ir nosaukums Latvijas Nacionālajam mākslas muzejam, kas atrodas Rīgā?",
              "options": ["Latvijas Nacionālais vēstures muzejs", "Latvijas Nacionālais mākslas muzejs", "Rundāles pils muzejs", "Arsenāls - Mākslas muzejs"],
              "correct": 1,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kurš latviešu tēlnieks ir zināms ar skulptūras 'Mātes Latvija' radīšanu?",
              "options": ["Kārlis Zāle", "Teodors Zaļkalns", "Gustavs Šķilters", "Aigars Bikše"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
              "text": "Kāds notikums Rīgā iezīmē latviešu modernās mākslas attīstības sākumu 20. gadsimta sākumā?",
              "options": ["Rīgas mākslinieku grupas izstāde", "1913. gada Baltijas izstāde", "Latvijas neatkarības pasludināšana", "Pirmā pasaules kara beigas"],
              "correct": 0,
              "image": "path/to/image.jpg"
            },
            {
            "text": "Kura no šīm tehnikām ir izmantota latviešu tautas mākslā, īpaši izšūšanā un audumā?",
            "options": ["Krāsošana", "Apgleznošana", "Dzelzs kalšana", "Krāsainu dziju izmantošana"],
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
  
