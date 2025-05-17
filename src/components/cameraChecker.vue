<template>
  <div>
    <button @click="openCameraModal" class="btn">Take Picture</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Camera Feed</h2>
        
        <!-- Permission error message -->
        <div v-if="permissionError && retryAttempts >= 3" class="error-message">
          <p>Camera access denied after 3 attempts. Please ensure camera permissions are enabled in your browser settings.</p>
          <button @click="retryCameraAccess" class="btn">Retry</button>
          <button @click="closeModal" class="btn">Close</button>
        </div>
        
        <!-- Camera selection -->
        <div v-else-if="cameras.length > 1" class="camera-select">
          <label for="cameraSelect">Select Camera:</label>
          <select id="cameraSelect" v-model="selectedCamera" @change="changeCamera">
            <option v-for="camera in cameras" :key="camera.deviceId" :value="camera.deviceId">
              {{ camera.label || `Camera ${cameras.indexOf(camera) + 1}` }}
            </option>
          </select>
        </div>

        <!-- Video feed -->
        <video v-if="!permissionError" ref="video" autoplay playsinline class="video-feed"></video>

        <!-- Captured image -->
        <div v-if="capturedImage" class="captured-image">
          <img :src="capturedImage" alt="Captured Image" />
        </div>

        <!-- Controls -->
        <div v-if="!permissionError" class="controls">
          <button @click="captureImage" :disabled="capturedImage" class="btn">Capture</button>
          <button @click="retake" v-if="capturedImage" class="btn">Retake</button>
          <button @click="closeModal" class="btn">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CameraCapture',
  data() {
    return {
      showModal: false,
      stream: null,
      cameras: [],
      selectedCamera: null,
      capturedImage: null,
      permissionError: false,
      retryAttempts: 0,
      maxRetries: 3,
    };
  },
  methods: {
    async checkCameraPermission() {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' });
          return permissionStatus.state === 'granted' || permissionStatus.state === 'prompt';
        } catch (error) {
          console.warn('Permission query failed:', error);
          return true;
        }
      }
      return true;
    },
    async openCameraModal() {
      this.permissionError = false;
      const hasPermission = await this.checkCameraPermission();
      console.log("hasPermission", hasPermission, "this.retryAttempts", this.retryAttempts);

      if (!hasPermission) {
        this.showModal = true;
        this.permissionError = true;
        return;
      }

      // Show the modal first to ensure the video element is rendered
      this.showModal = true;
      // Wait for the next tick to ensure the DOM is updated
      await this.$nextTick();

      while (this.retryAttempts < this.maxRetries) {
        try {
          await this.getCameraStream();
          await this.getCameraDevices();
          this.retryAttempts = 0; // Reset on success
          return;
        } catch (error) {
          console.error('Camera access error (attempt ' + (this.retryAttempts + 1) + '):', error.name, error.message);
          this.retryAttempts++;
          if (this.retryAttempts < this.maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
          }
        }
      }

      this.permissionError = true;
    },
    async getCameraStream() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          deviceId: this.selectedCamera ? { exact: this.selectedCamera } : undefined,
          facingMode: !this.selectedCamera ? { ideal: 'environment' } : undefined,
        },
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Ensure the video element exists before setting srcObject
      if (!this.$refs.video) {
        throw new Error('Video element not found in DOM');
      }
      this.$refs.video.srcObject = this.stream;
    },
    async getCameraDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.cameras = devices.filter(device => device.kind === 'videoinput');
      if (this.cameras.length > 0 && !this.selectedCamera) {
        this.selectedCamera = this.cameras[0].deviceId;
      }
    },
    async changeCamera() {
      try {
        await this.getCameraStream();
      } catch (error) {
        console.error('Error switching camera:', error.name, error.message);
        this.permissionError = true;
      }
    },
    captureImage() {
      const video = this.$refs.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      this.capturedImage = canvas.toDataURL('image/jpeg');
    },
    retake() {
      this.capturedImage = null;
    },
    async retryCameraAccess() {
      this.retryAttempts = 0;
      this.permissionError = false;
      await this.openCameraModal();
    },
    closeModal() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }
      this.showModal = false;
      this.capturedImage = null;
      this.selectedCamera = null;
      this.cameras = [];
      this.permissionError = false;
      this.retryAttempts = 0;
    },
  },
  beforeDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  text-align: center;
}

.video-feed {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 10px;
}

.captured-image img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  margin-bottom: 10px;
}

.camera-select {
  margin-bottom: 10px;
}

.camera-select select {
  padding: 5px;
  margin-left: 10px;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.error-message {
  color: #d32f2f;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  background: #0056b3;
}
</style>