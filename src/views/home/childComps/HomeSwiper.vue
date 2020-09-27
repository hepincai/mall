<template>
	<div class="home-swiper">
		<Swiper ref="swiper" :swiperItemData="swiperItemData">
			<swiper-item
				ref="swiperItem"
				:swiperItemData="swiperItemData"
				@sendCurrentIndex="sendCurrentIndex"
			>
				<a
					:href="item.link"
					v-for="(item, index) of banner.list"
					:key="index"
					class="img-wrapper"
					ref="imgWrapper"
				>
					<img
						:src="item.image"
						:alt="item.title"
						class="banner-img"
						@load="imgLoaded"
						ref="bannerImg"
					/>
				</a>
			</swiper-item>
		</Swiper>
	</div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
	name: "homeSwiper",
	components: {
		Swiper,
		SwiperItem,
	},
	data() {
		return {
			swiperItemData: {
				imgWrapperHeight: 0,
				bannerImgWidth: 0,
				bannerImgLen: 0,
				imgList: {},
			},
			imgCount: 0,
		};
	},
	props: {
		banner: {
			type: Object,
			required: true,
			default() {
				return {};
			},
		},
	},
	methods: {
		getStyle(ele, attr, isFloat = true) {
			if (isFloat) return parseFloat(getComputedStyle(ele, null)[attr]);
			else return getComputedStyle(ele, null)[attr];
		},
		imgLoaded() {
			// console.log("123");
			this.imgCount++;
			if (this.imgCount == this.banner.list.length - 1) {
				let imgWrapper = this.$refs.imgWrapper;
				let bannerImg = this.$refs.bannerImg;
				this.swiperItemData.imgWrapperHeight = this.getStyle(
					imgWrapper[0],
					"height"
				);
				this.swiperItemData.bannerImgWidth = this.getStyle(
					bannerImg[0],
					"width"
				);
				this.swiperItemData.bannerImgLen = this.banner.list.length;
				this.swiperItemData.imgList = imgWrapper;
				this.$refs.swiper.init();
				this.$refs.swiperItem.init();
			}
		},
		sendCurrentIndex(currentIndex) {
			this.$refs.swiper.currentIndex = currentIndex - 1;
		},
	},
	mounted() {
		// console.log(this.banner);
	},
};
</script>

<style scoped>
.home-swiper {
	margin-top: 44px;
}
</style>
