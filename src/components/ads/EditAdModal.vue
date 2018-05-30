<template>
<div>
    <v-dialog width="400px" v-model="modal">
    <v-btn slot="activator">Edit<v-icon right>edit</v-icon></v-btn>

    <v-card>
        <v-container>
            <v-layout row>
                <v-flex xs12>
                    <v-card-title>
                        <h1 class="text--primary">Редактирование задачи</h1>
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs12>
                    <v-card-text>
                        <v-text-field
                  name="title" 
                  label="Title" 
                  type="text"
                  v-model="editedTitle"
                  ></v-text-field>
                  <v-text-field
                  name="description" 
                  label="description" 
                  type="text"
                  multi-line
                  v-model="editedDescription"
                  ></v-text-field>
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs12>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                        @click="onCancel"
                        >Отмена</v-btn>
                        <v-btn 
                        class="success"
                        @click="onSave"
                        >ОК</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  props: ['ad'],
  data() {
    return {
      modal: false,
      editedDescription: this.ad.description,
      editedTitle: this.ad.title
    };
  },
  methods: {
    onCancel() {
        this.editedDescription = this.ad.description
        this.editedTitle = this.ad.title
        this.modal = false
    },
    onSave() {
        if(this.editedDescription !== '' && this.editedTitle !== '') {

            this.$store.dispatch('updateAd', {
                title: this.editedTitle,
                description: this.editedDescription,
                id: this.ad.id
            })

            this.modal = false
        }
    }
  }
};
</script>

