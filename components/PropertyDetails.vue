<template>
  <div class="app-wrapper">
    <div class="app-double-column app-property-details">
      <div>
        <h1>{{ home.title }}</h1>
        <div class="app-flex">
          <div class="app-address">
            {{ home.location.address }} {{ home.location.city }}
            {{ home.location.state }} {{ home.location.country }}
          </div>
          <div class="app-rating" style="display: flex">
            <img src="/images/star.svg" width="16" height="16" />
            <span class="mx-1">{{ home.reviewValue }}</span>
            <span>({{ home.reviewCount }})</span>
          </div>
        </div>
        <div class="app-property-details-footer">
          {{ pluralize(home.guests, "guest") }} &middot;
          {{ pluralize(home.bedrooms, "room") }} &middot;
          {{ pluralize(home.beds, "bed") }} &middot;
          {{ pluralize(home.bathrooms, "bath") }} <br />
        </div>
      </div>
      <div>
        <div class="app-price">
          ${{ home.pricePerNight }}<span>/ night</span>
        </div>
        <div class="app-search">
          <input type="text" class="datepicker" placeholder="Check in" />
          <input type="text" class="datepicker" placeholder="Check out" />
        </div>
        <button class="app-big-button">Request to book!</button>
      </div>
    </div>
  </div>
</template>

<script>
import pluralize from "~/utils/pluralize.js";

export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pluralize,
  },
};
</script>

<style lang="scss" scoped></style>
