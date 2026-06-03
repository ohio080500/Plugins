<template>
  <div>
    <h1>Geolocation Map</h1>

    <button @click="findLocation">Get My Location</button>

    <div id="map" style="height: 500px; margin-top: 20px;"></div>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      marker: null,
      error: null
    }
  },

  mounted() {
    // Default map view (Philippines / world view fallback)
    this.initMap()
  },

  methods: {
    initMap() {
      if (process.client) {
        this.map = window.L.map("map").setView([14.5995, 120.9842], 13) // default Manila

        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors"
        }).addTo(this.map)
      }
    },

    findLocation() {
      this.error = null

      if (!navigator.geolocation) {
        this.error = "Geolocation not supported"
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          // Move map to user location
          this.map.setView([lat, lng], 16)

          // Remove old marker if exists
          if (this.marker) {
            this.map.removeLayer(this.marker)
          }

          // Add new marker
          this.marker = window.L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup("You are here 📍")
            .openPopup()
        },
        (err) => {
          this.error = err.message
        }
      )
    }
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 100%;
  border: 2px solid #ddd;
  border-radius: 10px;
}
</style>