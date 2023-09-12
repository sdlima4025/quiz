// inicial data
let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();


// events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        //calculo da barra de respostas
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        // exibindo as perguntas
        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class = "option"><span>${parseInt(i)+ 1}</span> ${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickOption) {
        correctAnswers++;

    }
    
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 60) {
        document.querySelector('.scoreText1').innerHTML = 'reprovado!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 60 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Aprovado!';
        document.querySelector('.scorePct').style.color = '#FFF000'; 
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns Aprovado!';
        document.querySelector('.scorePct').style.color = '#0D630D'; 
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e Acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}