<template>
  <div style="text-align: center">
    <img
      src="https://media.tenor.com/BZqcYDSsdFUAAAAd/consistentspellingmistake.gif"
    />
    <h1>Oops! Something went wrong.</h1>
    <br />
    <h3>{{ error.message }} {{ error.statusCode }}</h3>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "BIG PROBLEM!",
    };
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
