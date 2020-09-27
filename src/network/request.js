import axios from "axios";
// 默认配置
// axios.defaults.baseURL = "http://123.207.32.32:8000";
// axios.defaults.timeout = 5000;

// .all方法在所有请求都成功才调用成功方法
// axios默认请求类型为Get类型,对应params参数
// axios
//   .all([
//     axios({
//       url: "home/multidata"
//     }),
//     axios({
//       url: "home/data",
//       params: {
//         type: "pop",
//         page: 1
//       }
//     })
//   ])
//   .then(
//     axios.spread((res1, res2) => {
//       console.log(res1), console.log(res2);
//     })
//   );

export function request(config) {
	let instance = axios.create();
	// instance.interceptors.request.use(
	// 	(config) => {
	// 		// console.log(config);
	// 		return config;
	// 	},
	// 	(err) => {
	// 		// console.log(err);
	// 		return err;
	// 	}
	// );
	// instance.interceptors.response.use(
	// 	(config) => {
	// 		// console.log(config);
	// 		return config;
	// 	},
	// 	(err) => {
	// 		// console.log(err);
	// 		return err;
	// 	}
	// );
	return instance(config);
}

export function requestAll(config) {
	let instance = axios.all(config);
	return instance;
}
