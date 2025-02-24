<template>
  <li :id="`item-${post.id}`">
    <article>
      <h2>{{ post.title }}</h2>

      <p>
        {{ post.body }}
      </p>
      <small>
        <router-link :to="`/posts/${post.id}`">Read more...</router-link>
      </small>
    </article>
  </li>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
    },
  },
};
</script>

<style  scoped>
li:nth-child(4n + 1) article {
  background: #42b983;
}

li:nth-child(4n + 3) article {
  background: #2c3e50;
}
li:nth-child(4n + 2) article {
  background: #2d8b61;
}
li:nth-child(4n + 4) article {
  background: #435b74;
}

article {
  color: white;
  padding: 0.3rem 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
}

a {
  color: white;
  text-decoration: none;
}
</style>
