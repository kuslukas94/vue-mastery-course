import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/kuslukas94/vue-mastery-course',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application.json'
  }
})

export default {
  getProductions() {
    return apiClient.get('/productions')
  },
  getOneProduction(id) {
    return apiClient.get('/productions/' + id)
  }
}
