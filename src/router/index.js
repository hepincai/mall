import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Home = () => import("views/home/Home.vue");
const Category = () => import("views/category/Category.vue");
const Cart = () => import("views/cart/Cart.vue");
const Profile = () => import("views/profile/Profile.vue");
const Detail = () => import("views/detail/Detail");
const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		component: Home,
	},
	{
		path: "/category",
		component: Category,
	},
	{
		path: "/cart",
		component: Cart,
	},
	{
		path: "/profile",
		component: Profile,
	},
	{
		path: "/detail",
		component: Detail,
	},
];

let router = new VueRouter({
	routes,
	mode: "history",
});

export default router;
