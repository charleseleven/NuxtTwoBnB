<template>
  <div class="app-container">
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <PropertyMap :home="home" />
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
  </div>
</template>

<script>
import PropertyDetails from "~/components/PropertyDetails.vue";
import PropertyGallery from "~/components/PropertyGallery.vue";
import PropertyDescription from "~/components/PropertyDescription.vue";
import PropertyMap from "~/components/PropertyMap.vue";
import PropertyReviews from "~/components/PropertyReviews.vue";
import PropertyHost from "~/components/PropertyHost.vue";

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
  components: {
    PropertyGallery,
    PropertyDetails,
    PropertyDescription,
    PropertyMap,
    PropertyReviews,
    PropertyHost,
  },
};
</script>
