<template>
<div>
    <v-dialog width="400px" v-model="modal">
    <v-btn class="primary" slot="activator">Buy</v-btn>
    <v-card>
        <v-container>
            <v-layout row>
                <v-flex xs12>
                    <v-card-title>
                        <h1 class="text--primary">покупка задачи</h1>
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs12>
                    <v-card-text>
                        <v-text-field
                  name="name" 
                  label="Name" 
                  type="text"
                  v-model="name"
                  ></v-text-field>
                  <v-text-field
                  name="phone" 
                  label="Phone" 
                  type="text"
                  multi-line
                  v-model="phone"
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
                        :disabled="localLoading"
                        >Отмена</v-btn>
                        <v-btn 
                        class="success"
                        @click="onSave"
                        :disabled="localLoading"
                        :loading="localLoading"
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
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel() {
        this.name = ''
        this.phone = ''
        this.modal = false
    },
    onSave() {
        if(this.name !== '' && this.phone !== '') {
            this.localLoading = true
            this.$store.dispatch('createOrder', {
                name: this.name,
                phone: this.phone,
                adId: this.ad.id,
                ownerId: this.ad.ownerId
            }).finally(() => {
                this.phone = '',
                this.phone = '',
                this.localLoading =false
                this.modal = false
            })
        }
    }
  }
};
</script>

