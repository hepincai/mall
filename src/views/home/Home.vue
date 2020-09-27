<template>
	<div>
		<navbar class="home-nav">
			<span slot="center">购物街</span>
		</navbar>
		<back-top @click.native="backTopClick" v-show="isShowBackTop" />
		<scroll
			ref="scroll"
			:probeType="3"
			:pullUpLoad="true"
			@setBackTop="setBackTop"
		>
			<home-swiper :banner="banner" />
			<recommend-view :recommend="recommend" />
			<feature-view />
			<tab-control :title="['流行', '热门', '精选']" @tabClick="tabClick" />
			<goods ref="goods" />
		</scroll>
	</div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils";

import TabControl from "components/content/tabControl/TabControl";
import Goods from "components/content/goods/Goods";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata } from "network/home";
export default {
	name: "home",
	components: {
		Navbar,
		Scroll,
		TabControl,
		Goods,
		BackTop,
		HomeSwiper,
		RecommendView,
		FeatureView,
	},
	methods: {
		// finshGoods() {
		// 	this.$refs.scroll.scroll.refresh();
		// },
		backTopClick() {
			this.$refs.scroll.backTop();
		},
		tabClick(index) {
			// console.log(index);
			this.$refs.goods.showTab(index);
		},
		setBackTop(bool) {
			this.isShowBackTop = bool;
		},
	},
	data() {
		return {
			banner: {},
			recommend: {},
			isShowBackTop: false,
			posY: 0,
		};
	},
	created() {
		getHomeMultidata().then((res) => {
			this.banner = res.data.data.banner;
			this.recommend = res.data.data.recommend;
		});
	},
	mounted() {
		// 设置滚轮刷新
		this.refresh = debounce(this.$refs.scroll.refresh);
		this.$bus &&
			this.$bus.$on("refresh", () => {
				this.refresh();
			});
	},
	deactivated() {
		// console.log(this.$refs.scroll.scroll.y);
		this.posY = this.$refs.scroll.scroll.y;
		// console.log(this.posY);
	},
	activated() {
		setTimeout(() => {
			this.$refs.scroll.scroll.scrollTo(0, this.posY);
		}, 300);
		// console.log(this.posY);
		// this.$refs.scroll.scroll
		// this.$refs.scroll.scroll.position.y = this.posY;
	},
};
</script>

<style scoped>
.home-nav {
	background-color: var(--color-tint);
	color: #fff;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 9999;
}
</style>
