<template>
	<div id="app">
		<keep-alive>
			<router-view />
		</keep-alive>
		<mainTabbar />
	</div>
</template>

<script>
import MainTabbar from "components/content/tabbar/MainTabbar.vue";
export default {
	name: "App",
	components: {
		MainTabbar,
	},
};
</script>

<style>
@import "~assets/css/base.css";
</style>
