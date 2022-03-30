import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { customProperties: true },
        themes: {
            light: {
                primary: "#363a4c",
                "green-dark": "#064f32",
                "green-regular": "#06603b",
                "white-tint": "#f9f9fb",
                "green-white": "#f3fefd",
                "white-overlay": "#2b7858",
                "orange-prime": "#ff7427",
                blueTint: "#3441b2",
                "white-offset": "#fcf6ff",
                gray: "#f8f8f8"
            },
        },
    },
});
