<template>
	<div class="home-goods-wrapper">
		<div
			class="home-good"
			v-for="(img, index) in goods[currentTab].img"
			:key="index"
			@click="jumpDetail"
		>
			<img class="goods-img" :src="img" alt="" @load="finishLoad" />
			<div class="text">
				<span>{{ goods[currentTab].desc[index] }}</span>
				<span>{{ goods[currentTab].favorites[index] | favourite }}</span>
			</div>
			<!-- <img src="~assets/img/home/01.webp" alt="" /> -->
		</div>
	</div>
</template>

<script>
import { getHomeMultidata } from "network/home";
export default {
	name: "goods",
	data() {
		return {
			currentTab: "pop",
			goods: {
				pop: {
					page: 0,
					img: [],
					desc: [],
					favorites: [],
				},
				new: {
					page: 0,
					img: [],
					desc: [],
					favorites: [],
				},
				selected: {
					page: 0,
					img: [],
					desc: [],
					favorites: [],
				},
			},
		};
	},
	filters: {
		favourite(str) {
			return "收藏:" + str;
		},
	},
	methods: {
		setGoods(count = 0, type = "pop") {
			let goods_info = {
				pop: {
					page: 0,
					img: [
						"https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg",
						"https://s10.mogucdn.com/mlcdn/c45406/180917_18l981g6clk33fbl3833ja357aaa0_750x390.jpg",
					],
					desc: ["描述1", "描述2"],
					favorites: [25, 40],
				},
				new: {
					page: 0,
					img: [
						"https://s10.mogucdn.com/mlcdn/c45406/180926_31eb9h75jc217k7iej24i2dd0jba3_750x390.jpg",
						"https://s10.mogucdn.com/mlcdn/c45406/180919_3f62ijgkj656k2lj03dh0di4iflea_750x390.jpg",
					],
					desc: ["描述3", "描述4"],
					favorites: [30, 50],
				},
				selected: {
					page: 0,
					img: [
						"https://s10.mogucdn.com/mlcdn/c45406/180917_18l981g6clk33fbl3833ja357aaa0_750x390.jpg",
						"https://s10.mogucdn.com/mlcdn/c45406/180926_31eb9h75jc217k7iej24i2dd0jba3_750x390.jpg",
					],
					desc: ["描述5", "描述6"],
					favorites: [70, 90],
				},
			};
			while (count > 0) {
				if (!type) {
					for (let item in goods_info) {
						goods_info[item].img.push(...goods_info[item].img);
						goods_info[item].desc.push(...goods_info[item].desc);
						goods_info[item].favorites.push(...goods_info[item].favorites);
					}
				} else {
					goods_info[type].img.push(...goods_info[type].img);
					goods_info[type].desc.push(...goods_info[type].desc);
					goods_info[type].favorites.push(...goods_info[type].favorites);
				}

				count--;
			}
			return goods_info;
		},
		getGoods(count = 2, type = "") {
			new Promise((resolve) => {
				setTimeout(() => {
					resolve(this.setGoods(count, type));
				}, 1000);
			}).then((res) => {
				if (!type) {
					for (let item in this.goods) {
						this.goods[item].img.push(...res[item].img);
						this.goods[item].desc.push(...res[item].desc);
						this.goods[item].favorites.push(...res[item].favorites);
					}
				} else {
					this.goods[type].img.push(...res[type].img);
					this.goods[type].desc.push(...res[type].desc);
					this.goods[type].favorites.push(...res[type].favorites);
					this.$bus.$emit("finishPullUp");
				}
			});
		},
		showTab(index) {
			let tab = ["pop", "new", "selected"];
			this.currentTab = tab[index];
			this.getGoods(2, this.currentTab);
			// console.log(typeof this.currentTab);
		},
		// 解决因加载慢导致的高度变化滑动bug
		finishLoad() {
			this.$bus.$emit("refresh");
		},
		jumpDetail() {
			this.$router.push("/detail");
		},
	},
	mounted() {
		this.getGoods(4);
		this.$bus.$on("getMoreGoods", () => {
			this.getGoods(2, this.currentTab);
		});
		// 接口失效
		// getHomeMultidata({}).then((res) => {
		// 	console.log(res);
		// });
	},
};
</script>

<style scoped>
.home-goods-wrapper {
	display: flex;
	text-align: center;
	justify-content: space-around;
	flex-wrap: wrap;
}
.home-good {
	flex-shrink: 0;
	width: 50%;
}
.text {
	display: flex;
	justify-content: space-around;
}
.goods-img {
	width: 48%;
}
</style>
