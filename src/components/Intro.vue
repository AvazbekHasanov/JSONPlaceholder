<template>
  <div class="location-container">
    <h2>📍 Location Checker</h2>
    <p>Check the distance between your current location and the target location.</p>
    <button @click="getCurrentLocation">Get Current Location</button>

    <div v-if="distance !== null" class="result">
      🌎 Distance to target: <strong>{{ distance.toFixed(2) }} km</strong>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distance: null
    };
  },
  methods: {
    getCurrentLocation() {
      const targetLat = 41.324527;
      const targetLng = 69.321834;

      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.distance = this.calculateDistance(latitude, longitude, targetLat, targetLng);
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
      );
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    }
  }
};
</script>

<style scoped>
.location-container {
  min-height: 70vh;
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2.5rem;
  color: #00796b;
  margin-bottom: 1rem;
}

p {
  font-size: 1.4rem;
  color: #555;
  margin-bottom: 2rem;
}

button {
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  color: white;
  background-color: #00796b;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #004d40;
}

.result {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #00796b;
}
</style>
