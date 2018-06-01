<template>
	<v-container>
		<v-layout>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-3">Новая задача</h1>
				<v-form v-model="valid" ref="form" validation class="mb-3">
					<v-text-field
					name="title" 
					label="Новая задача" 
					type="text"
					v-model="title"
					required
					:rules="[v=> !!v || 'Нужно заполнить']"
					></v-text-field>
					<v-text-field 
					name="description" 
					label="Описание" 
					type="text"
					:counter="255"
					multi-line
					:rules="[v=> !!v || 'Нужно заполнить']"
					v-model="description"
					></v-text-field>
				</v-form>
				<v-layout row>
					<v-flex xs12>
						<v-btn
						color="blue"
						class="white--text"
						@click="triggerUpload"
						>
						Добавить вложение
						<v-icon right dark>cloud_upload</v-icon>
					</v-btn>
					<input
					ref="fileInput"
              		type="file"
              		style="display: none;"
              		accept="image/*"
              		@change="onFileChange"
					>
					<v-layout row class="mt-3">
						<v-flex xs12>
							<img  :src="imageSrc" height="100" v-if="imageSrc">
						</v-flex>
					</v-layout>
					<v-layout row class="mt-3">
						<v-flex xs12>
							<v-switch
              color="blue"
							label="Разрешить добавление?"
							v-model="promo"
							></v-switch>
						</v-flex>
					</v-layout>
          <v-layout row class="mt-3">
						<v-flex xs12>
							<v-spacer></v-spacer>
                            <v-btn 
              class="success"
              @click="createAd"
							:loading="loading"
              :disabled="!valid || !image || loading"
              >
              Отправить
              </v-btn>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      	title: '',
        description: '',
        promo: false,
        valid: false,
        image: null,
        imageSrc: ''
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        };

        this.$store.dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {})
      }
	},
	triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0] // получаем картинку [первый элемент]

      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result;
      }
      reader.readAsDataURL(file);
      this.image = file;
    }
  }
}
</script>

