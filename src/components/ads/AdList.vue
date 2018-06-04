<template>
<div> 
    <v-container>
        <v-layout row v-if="!loading && myAds.length !==0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">AdList</h1>
                <v-card 
                class="elevation-10 mb-3"
                v-for="ad in myAds"
                :key="ad.id"
                >
                    <v-layout row>
                        <v-flex xs4>
                            <v-card-media
                            :src="ad.imageSrc"
                            height="160px"
                            >
                            </v-card-media>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{ad.title}}</h2>
                                <p>{{ad.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                class="info"
                                :to="'/ad/'+ad.id"
                                >Подробнее</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-else-if="!loading && myAds.length === 0">
            <v-flex xs12 class="text-xs-center" >
                <h2 class="text--primary">Записей нет</h2>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 class="text-xs-center" >
                <v-progress-circular 
					indeterminate
					:size="100" 
					:width="4"  
					color="blue">
					</v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>

<v-layout>
			<v-flex xs12 sm6 offset-sm3>
<v-form ref="ajaxForm">
      <v-text-field 
      label="login"
      v-model="dataform.login"
      type="text"
      name="login"
      ></v-text-field>
      {{ dataform.login}}
      {{ dataform.password}}
      {{ dataform.email}}
      <v-text-field
      label="password"
      v-model="dataform.password"
      type="password"
      name="password"
      ></v-text-field>
      <v-text-field 
      label="E-mail:"
      v-model="dataform.email"
      type="e-mail"
      name="e-mail"
      ></v-text-field>
    <v-btn 
    color="blue"
    class="white--text"
    @click="createAjax"
    >Зарегистрироваться</v-btn>
  </v-form>
  </v-flex>
    </v-layout>
  </div>

</template>

<script>
export default {
  data() {
    return {
      dataform: {
        login: "dos",
        password: "111",
        email: "dd@dd.ru"
      }
    }
  },
  methods: {
    createAjax() {
      const dataform = {
          login: this.dataform.login,
          password: this.dataform.password,
          email: this.dataform.email
        }

      this.$store.dispatch("createAjaxAct", this.dataform)
          .then(() => {
          })
          .catch(() => {
            console.log('404')
          })
      },
    register() {
      console.log(this.dataform);
      console.log('dataform');
      this.$http.post("feedback.php", this.dataform).then(
        response => {
          // ok callback
          console.log('----ok----');
          response.json().then(
            response => {
              console.log(response);
            }
          )
        },
        response => {
          // error callback
          console.log("EEEEERROORR!!!");
        }
      )
    }
  },
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

