import Question from "./question.js"
export default function Quiz(questions)
{
    this.questions = questions;
    this.score = 0;
    this.pos = 0;
}

Quiz.prototype.getCurrentQuestion = function()
{
    return this.questions[this.pos];
}

Quiz.prototype.nextIndex = function()
{
    this.pos++; 
}

Quiz.prototype.hasEnded = function()
{
    return this.pos === this.questions.length;
}

Quiz.prototype.guess = function(userGuess)
{
    const currentQuestion = this.questions[this.pos];
    if(currentQuestion.isCor(userGuess))
    {
        this.score++;
    }
    this.nextIndex();
}

Quiz.prototype.reset = function() 
{
    this.score = 0;
    this.pos = 0;
}


