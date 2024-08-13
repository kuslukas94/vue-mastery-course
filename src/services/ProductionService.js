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
    },
    {
      id: '1a2b3c4d-e5f6-7g8h-9i0j-1234567890kl',
      title: 'Kytice',
      category: '12+',
      duration: 100,
      location: 'Small',
      cast: 'Cast 1, Cast 3'
    }
  ]
}

const loadData = () => {
  return instance.get('/productions').then(() => ({ data }))
}

const saveData = (updatedProduction) => {
  const index = data.productions.findIndex((production) => production.id === updatedProduction.id)
  if (index !== -1) {
    data.productions[index] = updatedProduction
  } else {
    data.productions.push(updatedProduction)
  }
  return Promise.resolve(updatedProduction)
}

const deleteData = (uuid) => {
  return new Promise((resolve, reject) => {
    const index = data.productions.findIndex((production) => production.id === uuid)
    if (index !== -1) {
      data.productions.splice(index, 1)
      resolve({ message: 'Deleted successfully' })
    } else {
      reject({ message: 'Production not found' })
    }
  })
}

const getProductionById = async (id) => {
  try {
    const response = await instance.get(`/productions/${id}`)
    return response.data
  } catch (error) {
    console.log(`Failed to load production by ID: ${id}`)
    throw error
  }
}

const filterProductionsByReferenceTitle = async (referenceTitle) => {
  try {
    const { data } = await loadData()
    const productions = data.productions
    const referenceProduction = productions.find(
      (production) => production.title === referenceTitle
    )
    if (!referenceProduction) {
      return productions
    }
    return productions.filter((production) => {
      const locationMatch = production.location === referenceProduction.location
      const castMatch = referenceProduction.cast
        .split(', ')
        .some((castName) => production.cast.includes(castName))

      return !(locationMatch || castMatch)
    })
  } catch (error) {
    console.error('Error filtering productions regarding reference production:', error)
    throw error
  }
}

mock.onGet('/productions').reply(() => {
  return [200, data]
})

mock.onGet(/\/productions\/.+/).reply((config) => {
  const id = config.url.split('/').pop()
  const production = data.productions.find((p) => p.id === id)

  if (production) {
    return [200, production]
  } else {
    return [404]
  }
})

mock.onPost('/productions').reply((config) => {
  const newProduction = JSON.parse(config.data)
  return saveData(newProduction).then(() => [201, newProduction])
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
  deleteData,
  getProductionById,
  filterProductionsByReferenceTitle
}
