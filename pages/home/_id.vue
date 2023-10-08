<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        :alt="`image from ${home.title}}`"
        width="200"
        height="150"
      />
    </div>
    <h1>{{ home.title }}</h1>
    <br />
    ${{ home.pricePerNight }} / night<br />
    <img src="/images/marker.svg" width="20" height="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.location.country }} <br />
    <img src="/images/star.svg" width="20" height="20" />
    {{ home.reviewValue }} <br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.baths }} baths <br />
  </div>
</template>

<script>
import homes from "~/data/homes";

export default {
  name: "HomePage",
  head() {
    return {
      title: this.home.title,
    };
  },
  data() {
    return {
      home: {},
    };
  },
  created() {
    const home = homes.find((home) => home.objectID === this.$route.params.id);
    this.home = home;
    console.log(this.$route);
    console.log(this.$route.params.id);
  },
};
</script>
