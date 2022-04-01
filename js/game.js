const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
  {
    question:'Cuanto es 2+2',
    choice1: '2',
    choice2: '4',
    choice3: '22',
    choice4: '17',
    answer: 2,
  },
  {
    question:'Cual es la ciudad mas grande del mundo',
    choice1: "Dubai",
    choice2: "New York",
    choice3: "Shanghai",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question:'Porcentaje de adultos que consumen cereal',
    choice1: "20%",
    choice2: "18%",
    choice3: "7%",
    choice4: "33%",
    answer: 3,
  },
  {
    question:'Que porcentaje de..',
    choice1: "10-20%",
    choice2: "5-10%",
    choice3: "15-20%",
    choice4: "30-50%",
    answer: 1,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestion = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('../html/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionIndex = Math.floor(Math.random() * availableQuestion.length)
  currentQuestion = availableQuestion[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestion.splice(questionIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e =>{
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct'){
      incrementScore(SCORE_POINTS)
    }
    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    },1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}
startGame ()