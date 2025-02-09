const path = require("path"); //引入path模块
function resolve(dir) {
	return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
	chainWebpack: (config) => {
		config.resolve.alias
			.set("components", resolve("src/components"))
			.set("common", resolve("src/common"))
			.set("views", resolve("src/views"))
			.set("assets", resolve("src/assets"))
			.set("network", resolve("src/network"))
			.set("assets", resolve("src/assets"));
		//set第一个参数：设置的别名，第二个参数：设置的路径
	},
};
