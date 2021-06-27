import { eventBus } from "../services/event-bus-service.js"

export default {
    props: ['book'],
    template: `
            <li @click.prevent="log(book.id)" class="book-preview-container">
                <div class="book-preview">
                    <h3>{{book.title}}</h3>
                    <img :src="book.thumbnail">
                    <p>{{currencyFormatter}}{{book.listPrice.amount}}</p>
                </div>
                <div class="actions">
                    <button @click="remove()">X</button>
                    <router-link class="details-link" :to="'/book/'+book.id">Details</router-link>
                </div>
            </li>
    `,
    data() {
        return {
        }
    },
    created() {
        console.log(this.book);
    },
    methods: {
        log(bookId) {
            console.log('logging th id', bookId);
        },
        remove() {
            eventBus.$emit('removeBook', this.book.id);
        },
    },
    computed: {
        currencyFormatter() {
            let currencyIcon = '$'
            if (this.book.listPrice.currencyCode === 'EUR') return currencyIcon = '£'
            else if (this.book.listPrice.currencyCode === 'ILS') return currencyIcon = '₪'
            return currencyIcon
        }
    }
};
