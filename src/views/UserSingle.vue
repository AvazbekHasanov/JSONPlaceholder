<template>
  <section class="user-card">
    <h2>{{ user.name }}</h2>
    <ul name="user">
      <li><strong>Username:</strong> {{ user.username }}</li>
      <li><strong>Email:</strong> {{ user.email }}</li>
      <li>
        <strong>Street:</strong>
        {{ user.address.street + ', ' + user.address.suite }}
      </li>
      <li><strong>City:</strong> {{ user.address.city }}</li>
      <li><strong>Phone:</strong> {{ user.phone }}</li>
      <li><strong>Website:</strong> {{ user.website }}</li>
      <li><strong>Company:</strong> {{ user.company.name }}</li>
      <li><strong>Character:</strong> {{ user.company.catchPhrase }}</li>
    </ul>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "UserSingle",
  data() {
    return {
      user: "",
    };
  },
  created() {
    axios
        .get("https://jsonplaceholder.typicode.com/users/" + this.$route.params.id)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },
};
</script>

<style scoped>
.user-card {
  border: 1px solid gray;
  border-radius: 1rem;
  width: 40%;
  margin: 2rem auto;
  box-shadow: 6px 15px 20px gray;
  padding: 1rem;
}

.user-card ul {
  list-style: none;
  padding: 0;
}

.user-card li {
  font-size: 1.5rem;
  line-height: 3rem;
  border-bottom: 1px solid lightgray;
}

.user-card h2 {
  font-size: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid gray;
}

@media (max-width: 800px) {
  .user-card {
    width: 80%;
  }
}
</style>
