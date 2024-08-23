<script>
import ProductionService from '@/services/productionService.js'
import ProductionCard from '../components/ProductionCard.vue'

export default {
  components: {
    ProductionCard,
  },
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
        this.productions = await ProductionService.fetchData()
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
        const referenceProductions = this.productions.filter((production) =>
          production.title.toLowerCase().includes(partialTitle.toLowerCase())
        )
        if (referenceProductions.length === 0) {
          return []
        }
        return this.productions.filter((production) => {
          return !referenceProductions.some((reference) => {
            const locationMatch = production.location === reference.location
            const castMatch = reference.cast.some((referenceActor) =>
              production.cast.some((actor) => 
                actor.name === referenceActor.name
              )
            )
          return locationMatch && castMatch
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
    <div v-if="filteredProductions.length > 0">
      <ProductionCard v-for="production in filteredProductions" :key="production.id" :production="production"/>
    </div>
    <p v-else-if="searchText.length > 0">No other production playable.</p>
  </div>
</template>
