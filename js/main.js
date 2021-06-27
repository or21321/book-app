import bookApp from './pages/book-app.js'
import appHeader from './cmps/app-header.js'
import appFooter from './cmps/app-footer.js'
import userMsg from './cmps/user-msg.js'
import { router } from './router.js'

const options = {
    el: '#app',
    router,
    template: `
    <!-- right way ? class wise -->
        <section class="vue-app">
            <user-msg></user-msg>
            <app-header />
            <router-view></router-view>
            <app-footer />
        </section>
    `,
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg
    }
};

const app = new Vue(options);

