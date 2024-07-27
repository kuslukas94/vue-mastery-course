// todo name of the file should be lower case productionService.js
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

const saveData = (newData) => { // new data will be only one production
  data.productions = [...data.productions, ...newData.productions] //data.productions.push(newData)
  return new Promise((resolve) => {
    resolve({ data: newData }) // send all the data back
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

export default {
  loadData,
  saveData
}
