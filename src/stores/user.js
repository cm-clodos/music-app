import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    // keine arrow funktion, da sonst this nicht auf das store objekt zeigt
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

      // User in Firestore speichern
      // add erstellt ein Document mit einer zufälligen ID
      // mit doc(userCred.user.uid)und .set() wird die UID des Users als ID des Documents verwendet so können die Daten dem User zugeordnet werden
      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        userCategory: values.userCategory,
        country: values.country
      })

      await userCred.user.updateProfile({
        displayName: values.name
      })

      this.userLoggedIn = true
    }
  }
})
