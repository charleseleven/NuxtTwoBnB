<template>
  <div style="display: flex; margin: 10px">
    <div v-for="home in homes" :key="home.objectID">
      <NuxtLink :to="`/home/${home.objectID}`" prefetch>
        <HomeCard :home="home" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import HomeCard from "~/components/HomeCard.vue";
import homes from "~/data/homes";

export default {
  name: "IndexPage",
  components: { HomeCard },
  data() {
    return {
      homes: homes.slice(0, 3),
      title: "Home Page",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description",
        },
      ],
    };
  },
};
</script>
