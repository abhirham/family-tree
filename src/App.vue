<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
      elevate-on-scroll
    >
      <v-spacer></v-spacer>

      
    </v-app-bar>

    <v-main>
      <Container />
    </v-main>
  </v-app>
</template>

<script>
import Container from './components/Container';

export default {
  name: 'App',

  components: {
    Container,
  },

  data: () => ({
    //
  }),
};
</script>
