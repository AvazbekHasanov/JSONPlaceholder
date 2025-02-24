<template>
  <div id="app">
    <HeaderComponent />
    <div class="container">
      <nav id="sidebar">
        <router-link to="/">Home</router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/users">Users</router-link>
      </nav>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  components: {
    HeaderComponent,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

body {
  margin: 0;
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#app {
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  height: calc(100vh - 60px);
}

#sidebar {
  width: 250px;
  background: #2c3e50;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
@media screen and (max-width: 780px) {
  #sidebar {
    display: none;
  }
}



#sidebar a {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
}

#sidebar a:hover,
#sidebar .router-link-exact-active {
  background: #42b983;
}

.content {
  flex: 1;
  padding: 20px;
  max-height: 100%;
  overflow-y: auto;
}

button {
  border: none;
  background: gray;
  color: white;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 5px;
  transition: background 0.2s ease;
}

button:hover {
  background: #555;
}
</style>
