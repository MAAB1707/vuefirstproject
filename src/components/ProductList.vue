<template>
	<ul class="catalog__list">          
      <ProductItem v-for="product in products" :key="product.id" :product='product' ></ProductItem>
    </ul>
</template>

<script>
import ProductItem from './ProductItem'
export default {
	props:['products'],
	components:{ProductItem}
};
</script>
