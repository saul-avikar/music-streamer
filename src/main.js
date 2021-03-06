// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import {
	Vuetify,
	VApp,
	VNavigationDrawer,
	VFooter,
	VList,
	VBtn,
	VIcon,
	VGrid,
	VToolbar,
	VForm,
	VInput,
	VHover,
	VCard,
	VAlert,
	transitions
} from "vuetify";
import {
	Ripple
} from "vuetify/es5/directives";
import "../node_modules/vuetify/src/stylus/app.styl";
import FileSize from "@/filters/file-size";

Vue.use(Vuetify, {
	components: {
		VApp,
		VNavigationDrawer,
		VFooter,
		VList,
		VBtn,
		VIcon,
		VGrid,
		VToolbar,
		VForm,
		VInput,
		VHover,
		VCard,
		VAlert,
		transitions
	},
	directives: {
		Ripple
	},
	filters: {
		FileSize
	},
	theme: {
		primary: "#ee44aa",
		secondary: "#424242",
		accent: "#82B1FF",
		error: "#FF5252",
		info: "#2196F3",
		success: "#4CAF50",
		warning: "#FFC107"
	}
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	components: { App },
	template: "<App/>"
});
