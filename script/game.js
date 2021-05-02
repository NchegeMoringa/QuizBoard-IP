const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progresstext');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
//boolean
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions =[
    //array object
    { //question 1
        question: 'What is the capital of Kenya?',
        choice1: 'Nairobi',
        choice2: 'Kisumu',
        choice3: 'Kajiado',
        choice4: 'Mombasa',
        answer: 1,

    },
    {   //question 2
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '200',
        answer: 2,

    },
    {   //question 3
        question: 'What is the square root of 25?',
        choice1: '34',
        choice2: '5',
        choice3: '6',
        choice4: '67',
        answer: 2,

    },
    {   //question 4
        question: 'Who is the 1st President Of Kenya?',
        choice1: 'Donald Trump',
        choice2: 'Uhuru Kenyatta',
        choice3: 'Yoweri Museveni',
        choice4: 'Jomo Kenyatta',
        answer: 4,

    },
        {
            //question 5
        question: 'Whic of the below is not a Continent?',
        choice1: 'Africa',
        choice2: 'USA',
        choice3: 'Europe',
        choice4: 'Asia',
        answer: 2,

    },
    {   //question 6
        question: 'Who is the DP of Kenya?',
        choice1: 'Donald Trump',
        choice2: 'Uhuru Kenyatta',
        choice3: 'Yoweri Museveni',
        choice4: 'William Ruto',
        answer: 4,

    },
    {   //question 7
        question: 'What is 10 * 10 * 0?',
        choice1: '10',
        choice2: '0',
        choice3: '1000',
        choice4: '100000',
        answer: 2,

    },
    {   //question 8
        question: 'Which of the Countries below is not in Africa?',
        choice1: 'Kenya',
        choice2: 'Nigeria',
        choice3: 'Jamaica',
        choice4: 'Egypt',
        answer: 3,

    },
    {   //question 9
        question: 'Country with the Highest population?',
        choice1: 'Zambia',
        choice2: 'Somalia',
        choice3: 'India',
        choice4: 'Russia',
        answer: 3,

    },
    {   //question 10
        question: 'Headquarter of Toyota is in which Country?',
        choice1: 'USA',
        choice2: 'Europe',
        choice3: 'No Idea',
        choice4: 'Japan',
        answer: 4,

    }

]
const SCORE_POINTS = 10 // 10 points per question
const MAX_QUESTIONS = 10
// function start game
startGame = () =>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions] //spread operator
    getNewQuestions()// function to capture new question
}
//function getquestion once user has maxed the questions
getNewQuestions = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score) //save to localstorage

        return window.location.assign('../end.html') // the close html page.
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%` //calculate the question user is on
    
    const questionsIndex = Math.floor(Math.random() *availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex] // keep track of queiz i'm on
    question.innerHTML = currentQuestion.question

    choices.forEach(choice=>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : // to toggle to the green css
            'incorrect' // to toggle to the green css

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        }, 1000)
    })
})

incrementScore = num =>{
    score += num //score incementor
    scoreText.innerText = score 
}
startGame()