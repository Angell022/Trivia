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
    question:'Qué significa la «a» en RGBa',
    choice1: "Appearance",
    choice2: "Alpha",
    choice3: "Animation",
    answer: 2,
  },
  {
    question:'Forma correcta de declarar una media query en un archivo CSS',
    choice1: "@media-query only screen and (max-width: 480px)",
    choice2: "@media-screen (max-width: 480px)",
    choice3: "@media only screen and (max-width: 480px)",
    answer: 3,
  },
  {
    question:'Forma correcta para generar un efecto de transición',
    choice1: "transition: height .8s;",
    choice2: "transition-height: .8s;",
    choice3: "transform: transition(height, .8s)",
    answer: 1,
  },
  {
    question:'¿Para que se utiliza la regla @keyframes?',
    choice1: "Transición",
    choice2: "Rotación",
    choice3: "Animación",
    answer: 3,
  },
  {
    question:'La propiedad resize sirve para:',
    choice1: "Hace que el elemento cambie su tamaño al valor indicado.",
    choice2: "Hace que un elemento pueda ser modificable en su tamaño por el usuario.",
    choice3: "No existe dicha propiedad.",
    answer: 2,
  },
  {
    question:'Si queremos que un elemento no tenga bordes redondeados (setearlo a su valor por defecto), usamos:',
    choice1: "border-radius: null;",
    choice2: "border-radius: none;",
    choice3: "border-radius: 0;",
    answer: 3,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

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