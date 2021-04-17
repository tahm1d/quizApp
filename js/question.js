export default function Question(question, choices, ans)
{
    this.question = question;
    this.choices = choices;
    this.ans = ans;
}

Question.prototype.isCor = function(guessKey)
{
    return guessKey=== this.ans;
}