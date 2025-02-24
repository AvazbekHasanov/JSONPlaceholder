<template>
  <li>
    <article>
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p>{{ user.address.street + ', ' + user.address.suite }}</p>
      <p>{{ user.address.city }}</p>
      <footer>
        <router-link :to="`/users/${user.id}`">more info</router-link>
      </footer>
    </article>
  </li>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style scoped>
footer {
  margin: 1rem;
}

footer a {
  text-decoration: none;
  color: #42b883;
}

footer a:hover {
  color: #36a679; /* Darkened color */
}
</style>
