<script>
import ProductionService from '@/services/ProductionService.js'
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
        this.filterProductions()
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
          this.searchText.trim(),
        )
        sessionStorage.setItem('filteredProductions', JSON.stringify(this.filteredProductions))
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
    this.fetchProductions();
    const inputData = sessionStorage.getItem('searchText')
    const filteredData = sessionStorage.getItem('filteredProductions')
    if (inputData) {
      this.searchText = JSON.parse(inputData)
      this.filterProductions()
    }
    if (filteredData) {
      this.filteredProductions = JSON.parse(filteredData)
    }
  },
  watch: {
    searchText(newValue) {
      sessionStorage.setItem('searchText', JSON.stringify(newValue))
      this.filterProductions()
    }
  }
}
</script>

<template>
  <h1>Type production you want to play</h1>
  <input v-model="searchText" @input="filterProductions" placeholder="Enter production name" />
  <h3>Also playble productions:</h3>
  <div class="layout-compare">
    <div v-if="filteredProductions.length > 0" class="filtered-productions">
      <ProductionCard 
      v-for="production in [...filteredProductions].sort((a,b) => a.title.localeCompare(b.title))" 
      :key="production.id" 
      :production="production"/>
    </div>
    <p v-else-if="searchText.length > 0">No other production playable.</p>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

input {
  width: 100%;
  max-width: 300px;
  height: 2rem;
  text-align: center;
  border-radius: 5px;
  border: 1px solid $secondary;
}
.layout-compare {
  text-align: left;
}
.filtered-productions {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
