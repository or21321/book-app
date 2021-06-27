import { booksService } from "../services/books-service.js"
import { eventBus } from "../services/event-bus-service.js"
import { showMsg } from '../services/event-bus-service.js'
import bookFilter from "../cmps/book-filter.js"
import bookList from "../cmps/book-list.js"
import bookAdd from "../cmps/book-add.js"

export default {
    template: `
            <section class="book-app app-main">
                <book-filter @filtered="setFilter"/>
                <book-add @googleBookAdded="this.loadBooks"></book-add>
                <book-list :books="booksToShow" @selected="selectBook" @remove="removeBook"/>
            </section>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
        };
    },
    created() {
        this.loadBooks()
        eventBus.$on('removeBook', this.removeBook);
    },
    destroyed() {
        eventBus.$off('removeBook', this.removeBook);
    },
    methods: {
        loadBooks() {
            this.books = booksService.query()
                .then(books => this.books = books)
        },
        removeBook(bookId) {
            booksService.remove(bookId)
                .then(() => {
                    this.loadBooks();
                    const msg = {   
                        txt: 'Book removed',
                        type: 'success'
                    }
                    showMsg(msg)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            // ? when filtered no need to contact service? i filter the array i have already? or should it happen in service also?
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books

            if (this.filterBy.priceMax === '') this.filterBy.priceMax = Infinity
            if (this.filterBy.priceMin === '') this.filterBy.priceMin = 0

            const booksForDisplay = this.books.filter(book => {
                return (
                    book.title.toLowerCase().includes(this.filterBy.title.toLowerCase()) &&
                    book.listPrice.amount >= +this.filterBy.priceMin &&
                    book.listPrice.amount <= +this.filterBy.priceMax
                )
            })
            return booksForDisplay
        },
    },
    components: {
        bookFilter,
        bookList,
        bookAdd
    }
};
