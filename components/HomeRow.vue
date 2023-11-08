<template>
  <div style="display: flex; margin: 10px">
    <img
      :src="home.images[0]"
      style="width: 200px; height: 144px; margin-right: 10px; display: flex"
    />
    <div style="display: flex; flex-direction: column">
      {{ home.title }}<br />
      {{ home.location.address }} - {{ home.location.city }} -
      {{ home.location.state }} <br />
      {{ pluralize(home.guests, "guest") }},
      {{ pluralize(home.bedrooms, "room") }}, {{ pluralize(home.beds, "bed") }},
      {{ pluralize(home.bathrooms, "bath") }} <br />
      {{ home.pricePerNight }} / night <br />
      <img src="/images/star.svg" width="20" height="20" />
      {{ home.reviewValue }} ({{ home.reviewCount }}) <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`;
      if (number === 1 || number === 0) {
        return text;
      } else {
        return `${text}s`;
      }
    },
  },
};
</script>
