export default {
    props: ['review', 'idx'],
    template: `
            <li>
                <div class="review">
                    <h2>{{review.name}}</h2>
                            <!-- <div> -->
                    <span>Reading date: {{formatDate(review.readAt)}}</span>
                                <!-- <span>Reading date: {{review.readAt}}</span> -->
                    <span>Rated: {{stars(review.rating)}}</span>
                    <p v-if="review.reviewText">Said: {{review.reviewText}}</p>
                    <p v-else>Didnt left a comment</p>
                            <!-- </div> -->
                </div>
                <button @click="remove">delete</button>
            </li>
    `,
    data() {
        return {

        }
    },
    methods: {
        formatDate(timestamp) {
            let date = new Date(timestamp)
            let years = date.getFullYear();
            let months = date.getMonth() + 1;
            let days = date.getDate();
            let timeFormat = years + '-' + (months + '').padStart(2, '0') + '-' + (days + '').padStart(2, '0');
            return timeFormat;
        },
        remove() {
            // should use id
            this.$emit('removeReview', this.idx)
        },
        stars(rating) {
            console.log('rating', rating);
            let stars = '★'
            return stars.repeat(rating)
        },
    },
}