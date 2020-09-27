<template>
	<div class="tab-control">
		<div
			class="tab-item"
			v-for="(item, index) in title"
			:key="index"
			:class="{ active: index === currentIndex }"
			@click="tabClick(index)"
		>
			{{ item }}
		</div>
	</div>
</template>

<script>
export default {
	name: "tabControl",
	props: {
		title: {
			type: Array,
			default() {
				return null;
			},
		},
	},
	data() {
		return {
			currentIndex: 0,
		};
	},
	methods: {
		tabClick(index) {
			this.currentIndex = index;
			this.$emit("tabClick", index);
		},
	},
};
</script>

<style scoped>
.tab-control {
	display: flex;
	width: 100%;
	text-align: center;
	justify-content: space-around;
}
.tab-item {
	padding: 5px;
	/* background-color: #fff; */
}
.active {
	color: var(--color-high-text);
	border-bottom: 1px solid var(--color-high-text);
}
</style>
