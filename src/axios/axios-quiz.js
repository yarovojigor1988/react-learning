import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-201a8-default-rtdb.europe-west1.firebasedatabase.app/'
})