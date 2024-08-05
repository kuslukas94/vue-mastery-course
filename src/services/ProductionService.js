import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const instance = axios.create()
const mock = new MockAdapter(instance)

const data = {
  productions: [
    {
      id: '5d2bed1b-190a-45c6-9674-01925aeb6247',
      title: 'Hamlet on the Road',
      category: '12+',
      duration: 120,
      location: 'Big scene',
      cast: 'Cast 1'
    },
    {
      id: 'dc9099be-cd13-4cec-aa7d-3f31e6d8a866',
      title: 'Operky',
      category: '6+',
      duration: 90,
      location: 'Big scene',
      cast: 'Cast 2'
    }
  ]
}

const loadData = () => {
  return new Promise((resolve) => {
    resolve({ data })
  })
}

const saveData = (newData) => {
  data.productions.push(newData)
  return data
}

const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    const index = data.productions.findIndex((production) => production.id === id)
    if (index !== -1) {
      data.productions.splice(index, 1)
      resolve({ message: 'Deleted successfully' })
    } else {
      reject({ message: 'Production not found' })
    }
  })
}

mock.onGet('/productions').reply(() => {
  return [200, data]
})

mock.onPost('/productions').reply((config) => {
  const newProduction = JSON.parse(config.data)
  const newData = { productions: [newProduction] }
  return saveData(newData).then((savedData) => [201, savedData.data.productions[0]])
})

mock.onDelete(/\/productions\/.+/).reply((config) => {
  const id = config.url.split('/').pop()
  return deleteData(id)
    .then((response) => [200, response])
    .catch((error) => [404, error])
})

export default {
  loadData,
  saveData,
  deleteData
}
