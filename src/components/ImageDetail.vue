<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-img
                    class="white--text"
                    height="200px"
                    :src="image.url"
                    >

                    <v-card-title>
                  <div>
                    <span class="grey--text"> {{image.name}}</span>
                    <br>
                    <v-chip> {{image.scorePromedio}}</v-chip>
                    <br>
                    <span>
                      {{image.labels | separateLabels}}
                    </span>
                  </div>
                </v-card-title>
                        
                    </v-img>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex>
                <v-text-field label="Que opinas de esta foto?"
                v-model="comentario">

                </v-text-field>
                <v-layout>
                    <v-flex xs12 pt-5>
                        <v-btn primary @click="enviarComentario">Enviar</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex>
                        <h1>Otros comentarios</h1>
                    </v-flex>
                </v-layout>

                <v-layout v-for="comentario in comentarios" v-bind:key="comentario.id">
                    <v-flex xs12>
                        <v-text-field
                        :value="comentario.texto"
                        :label="comentario.score"
                        readonly
                        ></v-text-field>
                    </v-flex>
                </v-layout>


            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { firestore } from '../main.js';
export default{
    data() {
        return {
            id: this.$route.params.id,
            image: '',
            comentario: '',
            comentarios: []
        }
    },
        methods: {
            enviarComentario: function () {
                let comentario = {
                    imageId: this.id,
                    texto: this.comentario,
                    createdAt: (+new Date()),
                    score: 0
                }

                firestore.collection('comentarios').add(comentario)
            }
        },

        firestore () {
            return {
                image: firestore.collection('images').doc(this.id),
                comentarios: firestore.collection('comentarios').where("image.id", "==", this.id)
            }
        },
        filters: {
      separateLabels: function (value) {
        return `${value[0]}, ${value[1]}, ${value[2]}`
      }
    }
    }    
</script>