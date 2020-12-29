<template>
  <v-col
    :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
    class="pa-0"
  >
    <v-form
      ref="form"
      v-model="valid"
      :class="[$vuetify.breakpoint.smAndDown ? 'px-4' : 'px-12']"
      lazy-validation
    >
      <v-col class="d-flex flex-wrap">
        <v-col cols="12">
          <h2
            class="text-center mx-auto py-4 contact-form__title"
            style="position: relative; width: max-content"
          >
            Contact
          </h2>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="name"
            label="Nom"
            :rules="[v => v.length > 4 || 'Min 4 characters', v => v.length < 15 || 'Max 15 characters']"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="[v => !v && v.length > 1 || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Votre e-mail doit être valide']"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="phone"
            label="Téléphone"
            type="number"
            :rules="[v => v.length === 10 || 'Numéros de téléphone non valide']"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="objectMsg"
            label="Objet du message"
            counter="25"
            :rules="[v => v.length > 4 || 'Min 4 characters', v => v.length <= 25 || 'Max 25 characters']"
            maxlength="26"
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="msg"
            label="Message"
            counter="250"
            :rules="[v => v.length >= 25 || 'Min 25 characters', v => !v ? true : v.length <= 250 || 'Max 250 characters']"
            maxlength="251"
            auto-grow
            rows="3"
          />
        </v-col>
        <v-col cols="3">
          <v-btn
            :disabled="!valid"
            @click="validate"
          >
            Envoyer !
          </v-btn>
        </v-col>
      </v-col>
    </v-form>
  </v-col>
</template>

<script>
import axios from "axios"

export default {
name: "ContactForm",
  data: () => ({
    valid: false,
    name: '',
    email: '',
    msg: '',
    objectMsg: '',
    phone: '',
  }),
  methods: {
    validate () {
      console.log("dans validate method")
      if(this.$refs.form.validate()) {
        console.log("valide form")
        this.submitForm()
      } else {
        console.log("pas valide")
      }
    },
    async submitForm () {
      try {
        await axios.post('/.netlify/functions/contact-mailer', {
          name: this.name,
          msg: this.msg,
          email: this.email,
          objectMsg: this.object,
          phone: this.phone,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.contact-form__title::after {
  content: "";
  position: absolute;
  width: 80%;
  height: 2px;
  background-color: #cfa052;
  left: 10%;
  bottom: 0;
}
</style>
