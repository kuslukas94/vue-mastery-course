<script>
import productionService from '../services/productionService'

export default {
  data() {
    return {
      searchText: '',
      productions: [],
      filteredProductions: []
    }
  },
  methods: {
    async fetchProductions() {
      try {
        const response = await productionService.loadData()
        this.productions = response.data.productions
      } catch (error) {
        console.error('Error loading productions:', error)
      }
    },
    async filterProductions() {
      if (this.searchText.trim() === '') {
        this.filteredProductions = []
        return
      }
      try {
        this.filteredProductions = await this.filterProductionsByPartialTitle(
          this.searchText.trim()
        )
      } catch (error) {
        console.error('Error filtering productions:', error)
      }
    },
    async filterProductionsByPartialTitle(partialTitle) {
      try {
        const response = await productionService.loadData()
        const productions = response.data.productions
        const referenceProductions = productions.filter((production) =>
          production.title.toLowerCase().includes(partialTitle.toLowerCase())
        )
        if (referenceProductions.length === 0) {
          return []
        }
        return productions.filter((production) => {
          return !referenceProductions.some((reference) => {
            const locationMatch = production.location === reference.location
            const castMatch = reference.cast
              .split(', ')
              .some((castName) => production.cast.includes(castName))
            return locationMatch || castMatch
          })
        })
      } catch (error) {
        console.error('Error filtering productions by partial name:', error)
        throw error
      }
    }
  },
  mounted() {
    this.fetchProductions()
  }
}
</script>

<template>
  <h1>Input production you want to play</h1>
  <div>
    <input v-model="searchText" @input="filterProductions" placeholder="Enter production name" />
    <h3>Playble productions:</h3>
    <ul v-if="filteredProductions.length > 0">
      <li v-for="production in filteredProductions" :key="production.id">
        {{ production.title }}
      </li>
    </ul>
    <p v-else-if="searchText.length > 0">No other production playable.</p>
  </div>
</template>
