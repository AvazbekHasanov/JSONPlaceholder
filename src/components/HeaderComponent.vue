<template>
  <header>
    <h1><a href="/">{JSON} Placeholder</a></h1>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: flex-start;
  background: #2c3e50;
  color: white;
  padding: 1rem;
}

header a {
  color: white;
  text-decoration: none;
}

header h1 {
  margin: 0;
}
</style>
