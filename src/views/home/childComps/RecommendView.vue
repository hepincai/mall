<template>
	<div class="recommend-view">
		<a :href="item.link" v-for="(item, index) in recommend.list" :key="index">
			<img :src="item.image" alt="item.title" />
			<div class="recommend-text">{{ item.title }}</div>
		</a>
	</div>
</template>

<script>
export default {
	name: "recommendView",
	props: {
		recommend: {
			type: Object,
			default: null,
		},
	},
};
</script>

<style scoped>
.recommend-view {
	width: 100%;
	display: flex;
	text-align: center;
	padding-top: 10px;
	border-bottom: 8px solid #eee;
}
.recommend-view a {
	flex: 1;
	text-decoration: none;
	color: #000;
}
.recommend-view img {
	width: 80px;
	padding-bottom: 5px;
}
</style>
