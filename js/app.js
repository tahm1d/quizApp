import Question from "./question.js";
import Quiz from "./quiz.js"

const App = (()=> 
{
    //chaching the dom
    const quizEl = document.querySelector(".quiz");
    const questionEl = document.querySelector(".question");
    const trackerEl = document.querySelector(".tracker");
    const tagEl = document.querySelector(".tagline");
    const choiceEl = document.querySelector(".choices");
    const progEl = document.querySelector(".progress_inner");
    const nextButtonEl = document.querySelector(".next");
    const restartEl = document.querySelector(".restart");

    const q1 = new Question 
    (
        "whats 1+1?",
        [2,3,1,5],
        0
    );

    const q2 = new Question
    (
        "whats 2+2",
        [1,3,4,7],
        2
    );

    const q3 = new Question
    (
        "who's superman?",
        ["bruce", "clark", "barry", "victor"],
        1
    );

    const q4 = new Question
    (
        "what is batmans mothers name?",
        ["betty","shitty","martha","jasmine"],
        2
    );
    
    const q5 = new Question
    (
        "where does batman live?",
        ["Gotham", "central city", "metropolice", "bludhaven"],
        0
    );


    const quiz = new Quiz([q1, q2, q3, q4, q5]);
    console.log(quiz);

    const listeners = () =>
    {
        nextButtonEl.addEventListener("click", function()
        {
            const selectedRadio = document.querySelector('input[name="choice"]:checked');
            if(selectedRadio)
            {
                const key = Number(selectedRadio.getAttribute("data-order"));
                quiz.guess(key);
                console.log(`score ${quiz.score}`);
                renderAll();
            }
            
        });

        restartEl.addEventListener("click", function()
        {
            quiz.reset();
            renderAll();
            nextButtonEl.style.opacity = 1;

        })
    }


    const setText = (elem, text) =>
    {
        elem.innerHTML = text;
    }

    const renderQuestion = () =>
    {
        const question = quiz.getCurrentQuestion().question;
        setText(questionEl,question);
    }

    const renderChoices = () =>
    {
        let markup = "";
        const currentChoices = quiz.getCurrentQuestion().choices;
        console.log(currentChoices);
        currentChoices.forEach((elem, index) => {
            console.log(elem, index);
            markup += `
            <li class="choice">
                <input type="radio" name="choice" class="quiz_input" data-order="${index}" id="choice${index}">
                <label for="choice${index}" class="quiz_label">
                    <i>

                    </i>
                    <span>${elem}</span}
                </label>
            </li>
            `
            
        });

        setText(choiceEl, markup);
    }

    const renderTracker = () =>
    {
        const index = quiz.pos;
        const val = `${index+1} of ${quiz.questions.length}`;
        setText(trackerEl,val);

        console.log(index);
    }

    const getPercentage = (num1, num2)=>
    {
        return Math.round((num1/num2)*100);
    }


    const launch = (width, maxPercentage)=>
    {
        let loadingBar = setInterval(() => {
         
            if(width>maxPercentage)
            {
                clearInterval(loadingBar);
            }

            else
            {
                width++;
                progEl.style.width = width+"%";
            }
            
        }, 3);
    }


    const renderProgress = () =>
    {
        const currentWidth = getPercentage(quiz.pos, quiz.questions.length);
        console.log(`width ${currentWidth}`);
        launch(0,currentWidth);
    }

    const renderEnd = () =>
    {
        setText(questionEl, `Great job!`);
        setText(tagEl, `Done!`);
        setText(trackerEl, `Your Score: ${getPercentage(quiz.score, quiz.questions.length)}`);
        nextButtonEl.style.opacity = 0;
        renderProgress();
        
    }
  

    const renderAll = () =>
    {
        if(quiz.hasEnded())
        {
            renderEnd();
        }

        else
        {
            renderQuestion();
            renderChoices();
            renderTracker();
            renderProgress();

        }
    }

    return {
        renderAll: renderAll,
        listeners: listeners
    }

})();

App.renderAll();
App.listeners();














//const q1 = new Question();




/* console.log(myQuiz.getCurrentQuestion());
myQuiz.nextIndex();
console.log(myQuiz.getCurrentQuestion());

console.log(myQuiz.hasEnded()); */