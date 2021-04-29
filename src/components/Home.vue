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
        <v-btn id="primerBoton" color="primary" @click="uploadFile">Enviar</v-btn>
      </v-row>
      <v-row></v-row>
      <v-row></v-row>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-row>
        <v-container fluid>
          <v-row>
            <v-flex v-for="image in images" v-bind:key="image.id">
              <v-card>
                <v-img 
                class="white--text"
                height="200px"
                :src="image.url">
                  
                </v-img>

                <v-card-title>
                  <div>
                    <span class="grey--text"> {{image.name}}</span>
                    <br>
                    <v-chip> {{image.scorePromedio}}</v-chip>
                    <br>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn text @click="goToImageDetail(image.id)">Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-row>
        </v-container>
      </v-row>
  </v-container>
</template>

<script>
import { firestore, storage } from '../main.js';
  export default {
    name: 'Home',

    data: () => ({
      file:'',
      images: [],
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
      .then( url => {
        let image = {
          url: url,
          name: name,
          createdAt: (+new Date()),
          scorePromedio: 0
        }
        firestore.collection('images').add(image)
      })
    },
    goToImageDetail: function(id) {
      this.$router.push( { path: `/image/${id}`})
    }
  },
  firestore(){
    return {
      images: firestore.collection('images')
    }
  }
  };
  
  
</script>
