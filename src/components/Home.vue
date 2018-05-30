<template>
	<div v-if="!loading">
		<v-container fluid>
			<v-layout>
				<v-flex xs12>
					<v-carousel>
						<v-carousel-item 
						v-for="item in promoAds"
						:key="item.id"
						:src="item.imageSrc"
						>
						<div class="car-link">
							<v-btn class="error" :to="'/ad/'+item.id">{{item.title}}</v-btn>
						</div>
						</v-carousel-item>
					</v-carousel>
				</v-flex>
			</v-layout>
		</v-container>
		<v-container grid-list-lg>
			<v-layout row wrap>
				<v-flex 
				xs12 
				sm6 
				md4
				v-for="item of ads"
				:key="item.id">
				<v-card>
				<v-card-media :src="item.imageSrc" height="200px">
					</v-card-media>
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{item.title}}</h3>
							<div>{{item.description}}</div>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn flat :to="'/ad/'+item.id">Подробнее</v-btn>
						<app-buy-modal :ad="item"></app-buy-modal>
					</v-card-actions>
				</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
	<div v-else>
		<v-container>
			<v-layout row>
				<v-flex xs 12 class="text-xs-center pt-5">
					<v-progress-circular 
					indeterminate
					:size="100" 
					:width="4"  
					color="green">
					</v-progress-circular>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	export default {
		computed: {
			promoAds () {
				return this.$store.getters.promoAds
			},
			ads () {
				return this.$store.getters.ads
			},
			loading () {
				return this.$store.getters.loading
			}
		}
	};
</script>

<style scoped>
.car-link {
	position: absolute;
	bottom: 50px;
	left: 50%;
	background: rgba(0, 0, 0, .5);
	transform: translate(-50%, 0);
	padding: 5px 15px;
	border-radius: 5px 5px 0 0;
}
</style>

