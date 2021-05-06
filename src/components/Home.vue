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
              <v-card style="width:50%; margin: 20px auto; display:block">
                <v-img 
                class="white--text"
                height="200px"
                :src="image.url">
                  
                </v-img>

                <v-card-title style="height: 150px">
                  <div>
                    <span class="grey--text"> {{image.name}}</span>
                    <br>
                    <span>
                      {{image.labels | separateLabels}}
                    </span>
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
import axios from 'axios';
  export default {
    name: 'Home',

    data: () => ({
      apiKey: '',
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
        const input = this.$refs.fileInput
        input.type = 'text'
        input.type = 'file'
        const data = {
          "requests" : [{
            "features": [{
              "type": "LABEL_DETECTION"
            }],
            "image": {
              "source" : {
                "imageUri": url
              }
            }
          }]
        }

        axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`, data)
          .then(response => {
            const labels = []
            let slicedLabelArray = response.data.responses[0].labelAnnotations.slice(0,5)
            slicedLabelArray.forEach(function(label){
              labels.push(label.description)
            })
            let image = {
            url: url,
            name: name,
            labels: labels,
            createdAt: (+new Date()),
            scorePromedio: 0
          }
          firestore.collection('images').add(image)
          })

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
  },
    filters: {
      separateLabels: function (value) {
        return `${value[0]}, ${value[1]}, ${value[2]}`
      }
    }
  };
  
  
</script>
