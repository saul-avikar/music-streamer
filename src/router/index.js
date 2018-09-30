import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/HelloWorld";
import Upload from "@/pages/page-upload";

Vue.use(Router);

export default new Router({
	mode: "history",

	routes: [
		{
			path: "/",
			name: "Home",
			component: Home
		},

		{
			path: "/upload",
			name: "Upload",
			component: Upload
		},

		{
			path: "*",
			redirect: "/"
		}
	]
});
