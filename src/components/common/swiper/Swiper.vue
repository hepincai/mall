<template>
	<div class="banner-wrapper">
		<div class="pointer-wrapper">
			<div
				v-for="index in imgLen"
				class="banner-pointer"
				:class="{ active: index == currentIndex }"
				:key="index"
			>
				<a></a>
			</div>
		</div>
		<slot />
	</div>
</template>

<script>
export default {
	name: "swiper",
	props: {},
	data() {
		return {
			imgList: null,
			currentIndex: 1,
			timerShow: null,
			banner: null,
			imgLen: 0,
			isCircled: false,
			posX: 0,
			bannerPos: 0,
			wrapperHeight: "",
			imgWidth: 0,
		};
	},
	props: {
		swiperItemData: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	methods: {
		init() {
			let bannerWrapper = document.getElementsByClassName("banner-wrapper")[0];
			this.imgLen = this.swiperItemData.bannerImgLen;
			bannerWrapper.style.height = this.swiperItemData.imgWrapperHeight + "px";
		},
	},
	mounted() {
		// 动态获取展示框高度与图片宽度
		// setInterval(() => {
		// 	this.wrapperHeight = getComputedStyle(
		// 		this.banner.children[0],
		// 		null
		// 	).height;
		// 	this.imgWidth = parseInt(
		// 		getComputedStyle(this.banner.children[0].children[0], null).width
		// 	);
		// }, 1000);
	},
};
</script>

<style scoped>
.banner-wrapper {
	/* height: 390px; */
	position: relative;
	width: 100%;
	overflow: hidden;
}
.banner-wrapper a {
	display: block;
	flex-shrink: 0;
	width: 100%;
}
.pointer-wrapper {
	/* height: 20px; */
	position: absolute;
	z-index: 9;
	display: flex;
	bottom: 5px;
	left: 0;
	right: 0;
	justify-content: center;
}
.banner-pointer {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #000;
	margin: 0 5px;
}
.banner-pointer a {
	display: block;
	width: 100%;
	height: 100%;
}
.active {
	background-color: #f00;
}
</style>
