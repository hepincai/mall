<template>
	<div class="back-top">
		<img src="~assets/img/common/top.png" alt="回到顶部" />
	</div>
</template>

<script>
export default {
	name: "backTop",
};
</script>

<style scoped>
.back-top {
	position: fixed;
	bottom: 50px;
	right: 5px;
	z-index: 9999;
}
.back-top img {
	height: 55px;
}
</style>
