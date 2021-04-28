<template>
  <v-container>
    <v-row class="text-center">
      Fabrica de memes
      
    </v-row>
    <v-row>
        <v-col cols="6">
          <v-flex>
            <input type="file" ref="fileInput" id="file" @change="processFile($event)">
          </v-flex>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="primary" @click="uploadFile">Enviar</v-btn>
      </v-row>
  </v-container>
</template>

<script>
import { storage } from '../main';
  export default {
    name: 'Home',

    data: () => ({
      file:''
    }),

    methods: {
    processFile: function(event) {
      this.file = event.target.files[0];
    },
    uploadFile: function() {
      let name = (+new Date()) + '-' + this.file.name;
      let metadata = { contentType: this.file.type };
      storage.child(name).put(this.file, metadata)
      .then(snapshot => snapshot.ref.getDownloadURL())
    }
  }
  };
  
  
</script>
