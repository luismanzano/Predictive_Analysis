<template>
  <v-app>
    <v-app-bar app color="indigo" dark fixed>
<v-toolbar-title> Fabrica de Memes </v-toolbar-title>
    </v-app-bar>

    <v-main> 

      <v-container fluid> 
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
