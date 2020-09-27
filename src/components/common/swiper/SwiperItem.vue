<template>
	<div class="banner" ref="banner">
		<slot />
	</div>
</template>

<script>
export default {
	name: "swiperItem",
	data() {
		return {
			currentIndex: 2,
			isCircled: false,
		};
	},
	props: {
		swiperItemData: {
			type: Object,
			default() {
				return {};
			},
		},
		posPct: {
			type: Number,
			default() {
				return 0.25;
			},
		},
	},
	methods: {
		init() {
			let banner = this.$refs.banner;
			banner.style.left = -this.swiperItemData.bannerImgWidth + "px";
			let first_img = this.swiperItemData.imgList[0].cloneNode(true);
			let last_img = this.swiperItemData.imgList[
				this.swiperItemData.bannerImgLen - 1
			].cloneNode(true);
			banner.append(first_img);
			banner.prepend(last_img);
			this.bannerMove();
			// let imgList = [];
			// for (let i in banner.children)
			// 	imgList[i] = this.swiperItemData.imgList[i];
			// imgList.splice(imgLen - 1, 1);
			// imgList.splice(0, 1);
			// this.swiperItemData.imgList = imgList;
		},
		// 横幅滚动
		bannerMove() {
			let banner = this.$refs.banner;
			clearInterval(this.timerShow);
			this.timerShow = setInterval(() => {
				this.move(
					banner,
					"left",
					this.currentIndex * -this.swiperItemData.bannerImgWidth,
					50,
					() => {
						if (this.isCircled) {
							banner.style.left = -this.swiperItemData.bannerImgWidth + "px";
							this.isCircled = false;
						}
					}
				);
				this.currentIndex++;
				if (this.currentIndex == this.swiperItemData.bannerImgLen + 2) {
					this.currentIndex = 2;
					this.isCircled = true;
				}
				this.$emit("sendCurrentIndex", this.currentIndex);
			}, 2000);
		},
		// 移动函数
		move(ele, attr, target, speed, callback = () => {}) {
			if (
				(parseInt(getComputedStyle(ele, null)[attr]) > target && speed > 0) ||
				(parseInt(getComputedStyle(ele, null)[attr]) < target && speed < 0)
			)
				speed = -speed;
			clearInterval(timerMove);
			let timerMove = setInterval(() => {
				ele.style[attr] =
					parseInt(getComputedStyle(ele, null)[attr]) + speed + "px";
				if (
					(speed < 0 && parseInt(getComputedStyle(ele, null)[attr]) < target) ||
					(speed > 0 && parseInt(getComputedStyle(ele, null)[attr]) > target)
				) {
					ele.style[attr] = target + "px";
					clearInterval(timerMove);
					callback();
				}
			}, 30);
		},
		//  校验图片位置
		checkImgPos(posPct) {
			let banner = this.$refs.banner;
			// 向左滑动
			if (parseFloat(this.oldImgPos) > parseFloat(banner.style.left)) {
				banner.style.left =
					this.imgPosToInt(banner.style.left, "ceil", -posPct) *
						this.swiperItemData.bannerImgWidth +
					"px";
				if (
					this.imgPosToInt(banner.style.left, "ceil", -posPct) <=
					-(this.swiperItemData.bannerImgLen + 2 - 1)
				)
					banner.style.left = 1 * -this.swiperItemData.bannerImgWidth + "px";
				this.currentIndex =
					(-this.imgPosToInt(banner.style.left, "ceil", -posPct) %
						(this.swiperItemData.bannerImgLen + 2 - 1)) +
					1;
			} else {
				//向右滑动
				banner.style.left =
					this.imgPosToInt(banner.style.left, "floor", posPct) *
						this.swiperItemData.bannerImgWidth +
					"px";
				if (this.imgPosToInt(banner.style.left, "floor", posPct) >= 0)
					banner.style.left =
						(this.swiperItemData.bannerImgLen + 2 - 2) *
							-this.swiperItemData.bannerImgWidth +
						"px";
				this.currentIndex =
					(-this.imgPosToInt(banner.style.left, "floor", posPct) %
						(this.swiperItemData.bannerImgLen + 2 - 1)) +
					1;
			}
			this.$emit("sendCurrentIndex", this.currentIndex);
		},
		// 图片位置转为整数
		imgPosToInt(pos, attr = "", offset = 0) {
			if (attr)
				return Math[attr](
					parseFloat(pos) / this.swiperItemData.bannerImgWidth + offset
				);
			else return parseFloat(pos) / this.swiperItemData.bannerImgWidth + offset;
		},
		touchStart(e) {
			let banner = this.$refs.banner;
			this.currentMousePosX = e.touches[0].pageX;
			banner.addEventListener("touchmove", this.touchMove);
			document.documentElement.addEventListener("touchend", this.touchEnd);
			clearInterval(this.timerShow);
		},
		touchMove(e) {
			let banner = this.$refs.banner;
			this.oldImgPos = banner.style.left;
			banner.style.left =
				parseFloat(banner.style.left) +
				e.touches[0].pageX -
				this.currentMousePosX +
				"px";
			this.currentMousePosX = e.touches[0].pageX;
			e.preventDefault();
		},
		touchEnd() {
			let banner = this.$refs.banner;
			this.checkImgPos(1 - this.posPct);
			this.bannerMove();
			banner.removeEventListener("touchmove", this.touchMove);
			document.documentElement.removeEventListener("touchend", this.touchEnd);
		},
	},
	mounted() {
		let banner = this.$refs.banner;
		banner.addEventListener("touchstart", this.touchStart);
	},
};
</script>

<style scoped>
.banner {
	display: flex;
	position: absolute;
	width: 100vw;
	left: 0;
}
.banner a {
	flex-shrink: 0;
}
.banner img {
	width: 100vw;
}
</style>
