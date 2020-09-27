<template>
	<div id="tabbar">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "tabbar",
};
</script>

<style>
#tabbar {
	height: 49px;
	background-color: #f6f6f6;
	display: flex;
	justify-content: space-around;
	position: fixed;
	box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
