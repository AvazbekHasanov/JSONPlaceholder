<template>
  <div class="home">
    <CameraChecker />
  </div>
</template>

<script>
import CameraChecker from '../components/cameraChecker.vue';
import Intro from '../components/Intro.vue';

export default {
  name: 'Home',
  components: {
    Intro,
    CameraChecker,
  },
};
</script>
