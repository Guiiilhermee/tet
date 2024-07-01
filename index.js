const quizContainer = document.querySelector('.quiz__container')
const total = document.querySelector('.quiz__total')

const questionData = [
  {
    question: 'What is the capital of Argentina?',
    answers: [
    { text: 'Mendoza', correct: false },
    { text: 'Buenos Aires', correct: true },
    { text: 'Cordoba', correct: false },
    { text: 'Ushuaia', correct: false },
    ]
  },
  {
    question: 'What is the capital of Italy?',
    answers: [
      { text: 'Mantova', correct: false },
      { text: 'Milan', correct: false },
      { text: 'Rome', correct: true },
      { text: 'Venice', correct: false }
    ]
  },
  {
    question: 'What is the capital of Australia?',
    answers: [
      { text: 'Sydney', correct: false },
      { text: 'Canberra', correct: true },
      { text: 'Perth', correct: false },
      { text: 'Melbourne', correct: false }
    ]
  },
  {
    question: 'What is the capital of Egito?',
    answers: [
      { text: 'Cairo', correct: true },
      { text: 'Alexandria', correct: false },
      { text: 'Giza', correct: false },
      { text: 'Suez', correct: false },
    
    ]
  },
  {
    question: 'What is the capital of Norway?',
    answers: [
      { text: 'Flam', correct: false },
      { text: 'Oslo', correct: true },
      { text: 'Stavanger', correct: false },
      { text: 'Bergen', correct: false }
    ]
  },
  
]

const questionFunctions = {
  init() {
    const question = Number(localStorage.getItem('question')) || 0

    questions(question, question)
  },

  correct() {
    quizContainer.style.display = 'none'
    document.querySelector('.quiz__total').style.display = 'flex'

    const keys = Object.keys(localStorage)
    const values = keys
      .map(key => localStorage[key])
      .filter(value => value !== "5")

    const answers = questionData
      .map(question => question.answers.filter(a => values.includes(a.text))[0])
      .filter(a => a.correct === true)

    function returnQuestions() {
      localStorage.clear()
      window.location.reload()
    }

    const text = answers.length === 0 ? 
      'Better luck next time!' : 
      `Congratulations, you got it right ${answers.length} out of ${questionData.length}`

    const html = `
      <p class="quiz__total-text">
        ${text}  
      </p>

      <button type="button" class="quiz__total-return">Start again</button>
      `

    total.innerHTML = html

    const returnButton = document.querySelector('.quiz__total-return')
    returnButton.addEventListener('click', returnQuestions)
  },

  form() {
    const form = document.querySelector('#form-quiz')
    const quizInput = document.querySelectorAll('.quiz__input')  

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      window.location.reload()
  
      const submit = document.querySelector('.quiz__submit')
      const numberPage = submit.dataset.question
    
      localStorage.setItem('question', Number(numberPage))
  
      quizInput.forEach(question => {
        if (question.checked) {
          localStorage.setItem(question.id, question.value)
        }
      })
  
      questions(Number(numberPage), submit.id)
    })    
  },

  response() {
    const quizInput = document.querySelectorAll('.quiz__input')  
    const quizResponse = document.querySelectorAll('.quiz__wrapper')
  
    quizResponse.forEach(quiz => {
      const id = quiz.dataset.id
      
      quiz.addEventListener('click', () => {
        quizInput.forEach(question => {
          if (id === question.id) {
            question.checked = true
            document.querySelector('.quiz__submit').disabled = false
          } else {
            question.checked = false
          }
        })
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  questionFunctions.init()
  
  if (Number(localStorage.getItem('question')) === 5) {
    questionFunctions.correct()
  }

  setTimeout(() => {
    questionFunctions.form()
    questionFunctions.response()
  }, 100)

})

function questions(numberOfQuestion, id) { 
  document.querySelector('.quiz__total').style.display = 'none'

  const page = numberOfQuestion + 1
  const verifyNumberPage = document.querySelectorAll('.quiz__question')
  
  if (verifyNumberPage.length === 1) {
    verifyNumberPage.forEach(q => {
      if (q.dataset.question_number === id) {
        quizContainer.removeChild(q)
      }
    })
  }

  setTimeout(() => {
    questionData.slice(numberOfQuestion, page).map((qs) => {
      const container = document.createElement('div')
      container.setAttribute('class', 'quiz__question')
      
      const html = `
        <h1 class="quiz__title">My Geographic Quiz</h1>
  
        <span class="quiz__question__declaration">
          ${page} - ${qs.question}
        </span>
      
        <form id="form-quiz">
          ${qs.answers.map(q => {      
            return (
              `
              <div class="quiz__wrapper" data-id="question-${q.text}">
                <input 
                type="checkbox" 
                name="${q.text}" 
                id="question-${q.text}" 
                value="${q.text}"
                class="quiz__input"
                >
                <label for="question-${q.text}" class="quiz__question__response">${q.text}</label>
                <div class="checked"></div>
              </div>
              `
            )
          }).join(' ')}
      
          <div class="quiz__button-container">
            <button 
              type="submit" 
              class="quiz__submit" 
              data-question="${page}"
              id="question-${page}"
              disabled="true"
            >
              Next
            </button>
          </div>
        </form>
      `
  
      container.innerHTML = html
  
      quizContainer.appendChild(container)
    })
  }, 100)
}
