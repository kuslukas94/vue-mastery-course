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
  getEvents() {
    return apiClient.get('/events')
  },
  getOneEvent(id) {
    return apiClient.get('/events/' + id)
  }
}
