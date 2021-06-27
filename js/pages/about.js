// import { eventBus } from '../services/event-bus-service.js';
import { router } from '../router.js'
import aboutTeam from '../cmps/about-team.js';

export default {
    template: `
        <section class="home-page app-main">
            <h2 ref="header">About us...</h2>
            <>
            <!-- <button @click="callBus">Call the bus</button> -->
            <router-link :to="{name: 'Team'}">About</router-link>
            <router-view></router-view>
        </section>
    `,
    components: {
        aboutTeam
    },
    data() {
        return {
            interval: null,
            bonusCounter: 0
        }
    },
    created() {
        console.log('about page created');
        // console.log(this.$refs.header);
        this.interval = setInterval(() => {
            this.bonusCounter += 1
        }, 1000)
    },
    destroyed() {
        console.log('about comp life cycle has ended and it has been destroyed, time alive:', this.bonusCounter);
    },
    mounted() {
        router,
        console.log('about page mounted');
        console.log('using ref from about', this.$refs.header);
    },
    methods: {
        callBus() {
            // console.log(this.$refs.header);
            // eventBus.$emit('puk')
            // eventBus.$emit('puk2')
        }
    },
};