import { collection, getDoc, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { useRouter } from 'vue-router'
const router = useRouter()

// Funkce pro načtení všech dokumentů z kolekce "productions"
async function fetchData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'productions'))
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching productions:', error)
    throw error
  }
}

// Funkce pro uložení nebo aktualizaci dokumentu v kolekci "productions"
async function saveData(newProduction) {
  try {
    const productionsRef = collection(db, 'productions')
    // Zkontroluje, zda 'newProduction.id' není undefined
    if (newProduction.id) {
      // Zkontroluje, zda dokument s daným ID již existuje
      const docRef = doc(db, 'productions', newProduction.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        // Pokud dokument existuje, aktualizuje jej
        await updateDoc(docRef, newProduction)
        return newProduction
      } else {
        console.error(`No document found with ID: ${newProduction.id}`)
        throw new Error(`Production with ID: ${newProduction.id} not found`)
      }
    } else {
      // Pokud dokument neexistuje nebo 'id' nebylo definováno, vytvoří nový
      const docRef = await addDoc(productionsRef, newProduction)
      return { ...newProduction, id: docRef.id }
    }
  } catch (error) {
    console.error('Error saving production:', error)
    throw error
  }
}

// Funkce pro smazání dokumentu z kolekce "productions"
async function deleteData(id) {
  try {
    await deleteDoc(doc(db, 'productions', id))
    return { message: 'Deleted successfully' }
  } catch (error) {
    console.error('Error deleting production:', error)
    throw error
  }
}

// Funkce pro získání jednoho dokumentu podle ID z kolekce "productions"
async function getProductionById(id) {
  try {
    const docRef = doc(db, 'productions', id) // Používáme id dokumentu generované Firestore
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } // Vracíme id dokumentu a jeho data
    } else {
      console.error(`No document found with ID: ${id}`)
      throw new Error(`Production with ID ${id} not found`)
    }
  } catch (error) {
    console.error('Error in getProductionById:', error)
    if (error.message.includes('not found')) {
      router.push({
        name: '404Resource',
        params: { resource: 'play' }
      })
    } else {
      router.push({ name: 'network-error' })
    }
  }
}

// Funkce pro filtrování dokumentů na základě referenčního titulu
async function filterProductionsByReferenceTitle(referenceTitle) {
  try {
    const productions = await fetchData()

    const referenceProduction = productions.find((prod) => prod.title === referenceTitle)
    if (!referenceProduction) return productions

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

export default {
  fetchData,
  saveData,
  deleteData,
  getProductionById,
  filterProductionsByReferenceTitle
}
