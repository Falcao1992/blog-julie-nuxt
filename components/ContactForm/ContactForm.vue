<template>
  <v-form class="pa-8">
    <v-row class="pa-8">
      <v-col
        cols="6"
        class="d-flex flex-wrap"
      >
        <v-col cols="6">
          <v-text-field
            v-model="name"
            label="Nom"
            hide-details
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="email"
            label="Email"
            hide-details
          />
        </v-col>
        <!--<v-col cols="6">
          <v-text-field
            v-model="phone"
            label="Téléphone"
            type="number"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="object"
            label="Objet du message"
            counter="25"
            :rules="[v => v.length < 25 || 'Max 25 characters']"
            maxlength="25"
          />
        </v-col>-->
        <v-col cols="12">
          <v-textarea
            v-model="msg"
            label="Message"
            counter="250"
            :rules="[v => !v ? true : v.length < 250 || 'Max 250 characters']"
            maxlength="250"
            auto-grow
            rows="3"
          />
        </v-col>
        <v-col cols="3">
          <v-btn @click="submitForm()">
            Envoyer !
          </v-btn>
        </v-col>
      </v-col>
      <v-col cols="6">
        <v-img :src="require('~/assets/images/contactFormImg.png')" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios"

export default {
name: "ContactForm",
  data: () => ({
    name: '',
    email: '',
    msg: '',
    /*object: '',
    phone: '',*/
  }),
  methods: {
    async submitForm () {
      try {
        await axios.post('/.netlify/functions/contact-mailer', {
          name: this.name,
          msg: this.msg,
          email: this.email,
          /*object: this.object,
          phone: this.phone,*/
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
