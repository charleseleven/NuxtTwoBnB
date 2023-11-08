<template>
  <div>
    Results for {{ label }}
    <div style="display: flex; justify-content: space-between">
      <div v-if="homes.length > 0">
        <NuxtLink
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <HomeRow :home="home" />
        </NuxtLink>
      </div>
      <div v-else>No results found</div>
      <div style="height: 800px; width: 70%" ref="map"></div>
    </div>
  </div>
</template>

<script>
import HomeRow from "~/components/HomeRow.vue";

export default {
  head() {
    return {
      title: `Homes around ${this.label}`,
    };
  },
  mounted() {
    this.updateMap();
  },
  methods: {
    updateMap() {
      this.$maps.showMap(
        this.$refs.map,
        this.lat,
        this.lng,
        this.getHomeMarkers()
      );
    },
    getHomeMarkers() {
      return this.homes.map((home) => {
        return {
          ...home._geoloc,
        };
      });
    },
  },
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(
      to.query.lat,
      to.query.lng
    );
    this.homes = data.json.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;
    this.updateMap();
    next();
  },
  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng);
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    };
  },
  components: { HomeRow },
};
</script>

<style lang="scss" scoped></style>
