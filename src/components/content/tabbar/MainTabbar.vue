<template>
	<tabbar>
		<!-- <div @click="itemChange('/home')"> -->
		<tabbar-item path="/home" fontColor="red">
			<img slot="item-icon" src="~assets/img/tabbar/01.gif" />
			<img slot="item-icon-active" src="~assets/img/tabbar/02.gif" />
			<div slot="item-text">首页</div>
		</tabbar-item>
		<!-- </div> -->
		<!-- <div @click="itemChange('/cart')"> -->
		<tabbar-item path="/category" fontColor="red">
			<img slot="item-icon" src="~assets/img/tabbar/01.gif" />
			<img slot="item-icon-active" src="~assets/img/tabbar/02.gif" />
			<div slot="item-text">分类</div>
		</tabbar-item>
		<tabbar-item path="/cart" fontColor="red">
			<img slot="item-icon" src="~assets/img/tabbar/01.gif" />
			<img slot="item-icon-active" src="~assets/img/tabbar/02.gif" />
			<div slot="item-text">购物车</div>
		</tabbar-item>
		<!-- </div> -->
		<!-- <div @click="itemChange('/profile')"> -->
		<tabbar-item path="/profile" fontColor="red">
			<img slot="item-icon" src="~assets/img/tabbar/01.gif" />
			<img slot="item-icon-active" src="~assets/img/tabbar/02.gif" />
			<div slot="item-text">我的</div>
		</tabbar-item>
		<!-- </div> -->
	</tabbar>
</template>

<script>
import tabbar from "components/common/tabbar/Tabbar";
import tabbarItem from "components/common/tabbar/TabbarItem";
export default {
	name: "main-tabbar",
	components: {
		tabbar,
		tabbarItem,
	},
};
</script>
