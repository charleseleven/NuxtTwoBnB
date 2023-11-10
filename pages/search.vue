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
          <HomeRow
            :home="home"
            @mouseover.native="highlightMarker(home.objectID, true)"
            @mouseout.native="highlightMarker(home.objectID, false)"
          />
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
    highlightMarker(homeId, isHighlighted) {
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle(`marker-highlight`, isHighlighted);
    },
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
          pricePerNight: home.pricePerNight,
          id: home.objectID,
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

<style>
.marker {
  background: white;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 8px;
}
.marker-highlight {
  color: white !important;
  background: black;
  border-color: black;
}
</style>
