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
    {{ home.description }} <br />
    <div style="height: 800px; width: 800px" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" />
      {{ review.reviewer.name }} <br />
      {{ formatDate(review.date) }} <br />
      <ShortText :text="review.comment" :target="150" /><br />
    </div>
    <img :src="user.image" />
    <br />
    {{ user.name }} <br />
    {{ formatDate(user.joined) }}<br />
    {{ user.reviewCount }} <br />
    {{ user.description }} <br />
  </div>
</template>

<script>
export default {
  name: "HomePage",
  head() {
    return {
      title: this.home.title,
    };
  },
  data() {
    return {};
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        // day: "numeric",
      });
      return date;
    },
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },
  async asyncData({ params, $dataApi, error }) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ]);

    const badResponse = responses.find((response) => !response.ok);
    if (badResponse)
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    };
  },
};
</script>
