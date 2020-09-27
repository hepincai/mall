<template>
	<div class="scroll-wrapper" ref="scroll">
		<div class="scroll">
			<slot />
		</div>
	</div>
</template>

<script>
import BScroll from "better-scroll";
export default {
	name: "Scroll",
	data() {
		return {
			scroll: null,
		};
	},
	props: {
		probeType: {
			type: Number,
			default() {
				return 0;
			},
		},
		pullUpLoad: {
			type: Boolean,
			default() {
				return false;
			},
		},
		targetPosition: {
			type: Number,
			default() {
				return 1000;
			},
		},
	},
	methods: {
		backTop() {
			this.scroll.scrollTo(0, 0, 500);
		},
		refresh() {
			this.scroll.refresh();
		},
		// debounce(func, delay = 100) {
		// 	let timer = null;
		// 	let obj = this;
		// 	return function(...args) {
		// 		if (timer) clearTimeout(timer);
		// 		timer = setTimeout(() => {
		// 			func.apply(obj.scroll, args);
		// 		}, delay);
		// 	};
		// },
	},
	mounted() {
		this.scroll = new BScroll(this.$refs.scroll, {
			click: true,
			probeType: this.probeType,
			pullUpLoad: this.pullUpLoad,
		});
		// 设置刷新
		// const refresh = debounce(this.scroll.refresh);
		// this.$bus &&
		// 	this.$bus.$on("refresh", () => {
		// 		refresh(this.scroll);
		// 	});
		// 设置滚轮侦测
		if (this.probeType === 2 || this.probeType === 3) {
			this.scroll.on("scroll", (position) => {
				this.$emit("setBackTop", Math.floor(-position.y) > this.targetPosition);
			});
		}
		// 上拉刷新
		this.scroll.on("pullingUp", () => {
			this.$bus.$emit("getMoreGoods");
		});
		this.$bus.$on("finishPullUp", () => {
			this.scroll.finishPullUp();
		});
	},
	deactivated() {
		// this.scroll.scrollTo()
		// console.log("deactivated");
	},
	destroyed() {
		console.log("destroyed");
	},
};
</script>

<style scoped>
.scroll-wrapper {
	position: absolute;
	top: 44px;
	bottom: 49px;
}
</style>
