<template>
  <div class="location-container">
    <h2>📍 Location Checker</h2>
    <p>Check the distance between your current location and the target location.</p>

    <button @click="getCurrentLocation" :disabled="isLoading">
      {{ isLoading ? 'Fetching Location...' : 'Get Current Location' }}
    </button>

    <div v-if="error" class="error">❌ {{ error }}</div>

    <div v-if="distance !== null" class="result">
      🌎 Distance to target: <strong>{{ distance.toFixed(2) }} km</strong>
    </div>

    <div v-if="isLoading" class="loader"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distance: null,
      isLoading: false,
      error: null
    };
  },
  methods: {
    async getCurrentLocation() {
      this.isLoading = true;
      this.error = null;
      this.distance = null;

      const targetLat = 41.324527;
      const targetLng = 69.321834;

      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });

        if (permission.state === 'denied') {
          this.error = 'Location access denied. Please enable it in browser settings.';
          this.isLoading = false;
          return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              this.distance = this.calculateDistance(latitude, longitude, targetLat, targetLng);
              this.isLoading = false;
            },
            (error) => {
              this.error = error.code === 1 ? 'Location access not permitted.' : 'Failed to get location.';
              this.isLoading = false;
            }
        );
      } catch (err) {
        this.error = 'Failed to check permission state.';
        this.isLoading = false;
      }
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

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #004d40;
}

.result {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #00796b;
}

.error {
  margin-top: 1.5rem;
  font-size: 1.3rem;
  color: #d32f2f;
}

.loader {
  margin-top: 1.5rem;
  border: 6px solid #e0f7fa;
  border-top: 6px solid #00796b;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
