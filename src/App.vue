<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app>
<v-toolbar-title> Fabrica de Memes </v-toolbar-title>
    </v-toolbar>

    <v-content> 

      <v-container fluid> 
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>

    <v-main>
      <router-view/>
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
