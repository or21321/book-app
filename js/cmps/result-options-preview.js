import { showMsg } from '../services/event-bus-service.js'

export default {
    props: ['book'],
    template: `
                    <li >
                    <span>{{book.volumeInfo.title}}</span>
                    <button type="button" class="add-book-btn" @click="addBookFromGoogle">+</button>
                    </li>
    `,
    data() {
        return {
        }
    },
    created() {
        console.log('res-preview book:', this.book);
    },
    mounted() {
        console.log('res-preview book:', this.book);
    },
    computed: {

    },
    methods: {
        addBookFromGoogle() {
            // booksService.addGoogleBook(googleBook)
            this.$emit('addGoogleBook', this.book)
            console.log('emited by this.book', this.book);
            const msg = {
                txt: 'Book added',
                type: 'success'
            }
            showMsg(msg)
        }
    },
}