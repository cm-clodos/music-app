<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
          suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
          pulvinar, fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>

    <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="/assets/img/introduction-music.png" />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <app-song-item v-for="song in songs" :key="song.docID" :song="song" />

      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import { songsCollection } from '@/includes/firebase'
import AppSongItem from '@/components/SongItem.vue'


export default {
  name: 'HomeView',
  components: {
    AppSongItem
  },
  data() {
    return {
      songs: [],
      maxPerPage: 25,
      pendingRequest: false
    }
  },
  async created() {
    await this.getSongs()

    window.addEventListener('scroll', this.handelScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handelScroll)
  },
  methods: {
    handelScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window

      // Berechnen, ob wir am Ende der Seite sind
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if (bottomOfWindow) {
        this.getSongs()
      }

    },
    async getSongs() {
      if (this.pendingRequest) {
        return
      }
      this.pendingRequest = true

      let snapshots;

      // Wenn wir bereits Songs haben, dann holen wir den letzten Song
      if (this.songs.length) {
        // den letzten Song holen
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get()

        // nach dem letzten Song weitere Songs holen
        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        // Wenn wir noch keine Songs haben, dann holen wir die ersten Songs
        snapshots = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();

      }
      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data()
        })
      })

      this.pendingRequest = false
    }
  },


}
</script>

<style lang="scss" scoped></style>
