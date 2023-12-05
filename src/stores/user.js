import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    // keine arrow funktion, da sonst this nicht auf das store objekt zeigt
    async register(values) {
      await auth.createUserWithEmailAndPassword(values.email, values.password)

      // User in Firestore speichern
      await usersCollection.add({
        name: values.name,
        email: values.email,
        age: values.age,
        userCategory: values.userCategory,
        country: values.country
      })

      this.userLoggedIn = true
    }
  }
})
