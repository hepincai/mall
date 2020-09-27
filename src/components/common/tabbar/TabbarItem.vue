<template>
	<div class="tabbar-item" @click="itemChange" :style="isActive">
		<div v-if="$route.path == path">
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<slot name="item-text"></slot>
	</div>
</template>

<script>
export default {
	name: "tabbar-item",
	props: {
		path: String,
		fontColor: {
			type: String,
			default: "#000",
		},
	},
	computed: {
		isActive() {
			return this.$route.path == this.path ? { color: this.fontColor } : {};
		},
	},
	methods: {
		itemChange() {
			if (this.$route.path != this.path) this.$router.replace(this.path);
		},
	},
};
</script>

<style>
.tabbar-item {
	height: 24px;
	font-size: 14px;
	text-align: center;
}
.tabbar-item img {
	margin-top: 3px;
	margin-bottom: 2px;
	height: 24px;
	vertical-align: bottom;
}
</style>
