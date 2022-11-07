import  Vue from "vue";
import  Vuex from "vuex";
import products from "@/data/products";
import axios from "axios";
import { API_BASE_URL } from "@/config";


Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		cartProducts: [
			{productId: 1, amount: 2}
		],

		userAccessKey: null,

		cartProductsDate: []
	},
	mutations: {
		addProductToCart(state, {productId, amount}){
			const item = state.cartProducts.find(item => item.productId === productId)
			if(item){
				item.amount += amount;
			}else{
				state.cartProducts.push({
					productId,
					amount,
				})
			}
		},
		updateCartProductAmount(state, {productId, amount}){
			const item = state.cartProducts.find(item => item.productId === productId)
			 if(item){
				 item.amount = amount
			 }
		},
		delteCartProduct(state, productId){
			state.cartProducts = state.cartProducts.filter(item => item.productId != productId)
		},
		updateUserAccesKey(state, acceskey){
			state.userAccessKey = acceskey
		},
		updateCartProductsData(state, items){
			state.cartProductsDate = items
		}
	},
	getters: {
		cardDetail(state){
			return state.cartProducts.map(item => {
				return {
					...item,
					product: products.find(p => p.id === item.productId)
				}
			})
		},
		cartTotalPrice(state, getters){
			return getters.cardDetail.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
		}
	},
	actions: {
		loadCart(context){
			axios
				.get(API_BASE_URL + '/api/baskets', {
				})
				.then(response => {					
					context.commit('updateUserAccesKey', response.data.user.accessKey)
					context.commit('updateCartProductsData', response.data.items)
				})

		}
	}
})