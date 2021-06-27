import { booksService } from "../services/books-service.js"
import { eventBus } from '../services/event-bus-service.js'
import reviewSection from "../cmps/review-section.js"

export default {
    template: `
    <section v-if="book" class="book-details app-main">
        <button @click="goToBooksPage" class="close-details">X</button>

        <h2>{{book.title}}</h2>
        <div class="description" @click="showMoreDesc=!showMoreDesc">
            Description: 
        <span>{{this.bookDescription}}</span>
        </div>
        <div class="review-btn" @click="openReviewSection">
                    Leave a review
        </div>
        <div class="details-thumbnail-container">
            <div class="details">
                <span class="book-price" :class="priceColor">
                     {{currencyFormatter}}{{book.listPrice.amount}}
                    <span v-if="isBookOnSale">On sale!</span>
                </span>
                <p>Subtitle: {{book.subtitle}}</p>
                <p>Author: <span v-for="author in book.authors">{{author}}</span></p>
                <p>Published: {{book.publishedDate}}{{this.bookCondition}}</p>
                <!-- ?better way to do it? so i can also put "," between in a proper way? -->
                <p>Categories: <span v-for="category in book.categories">{{category}} </span></p>
                <p>Reading level: {{this.readingLevel}}</p>
                <p>Pages: {{book.pageCount}}</p>
                <p>language: {{book.language}}</p>
            </div>
            <div class="thumbnail">
                <img :src="book.thumbnail">
            </div>
        </div>
        <review-section :bookId="this.book.id" v-if="isReviewSectionOn" @closeReviews="isReviewSectionOn = false"></review-section>
        <div class="negs-books-links">
            <router-link class="book-link" :to="'/book/' + previousBookId">Previous Book</router-link>
            <router-link class="book-link" :to="'/book/' + nextBookId">Next Book</router-link>
        </div>
    </section>
    `,
    data() {
        return {
            showMoreDesc: false,
            book: null,
            isReviewSectionOn: false,
            nextBookId: null,
            previousBookId: null
        }
    },
    components: {
        reviewSection
    },
    watch: {
        '$route.params.bookId': {
            immediate: true,
            handler() {
                console.log('handler');
                const { bookId } = this.$route.params;
                booksService.getById(bookId)
                    .then(book => this.book = book);
                booksService.getNegsBooksId(bookId)
                    .then(bookId => {
                        this.nextBookId = bookId.next
                        this.previousBookId = bookId.previous

                    })
            },


        }
    },
    methods: {
        goToBooksPage() {
            this.$router.push('/book')
        },
        openReviewSection() {
            console.log('user reviewing..');
            this.isReviewSectionOn = true
        },
    },
    computed: {
        currencyFormatter() {
            let currencyIcon = '$'
            if (this.book.listPrice.currencyCode === 'EUR') return currencyIcon = '£'
            else if (this.book.listPrice.currencyCode === 'ILS') return currencyIcon = '₪'
            return currencyIcon
        },
        readingLevel() {
            let readingLevel = 'Light reading'
            if (this.book.pageCount < 500 && this.book.pageCount > 200) readingLevel = 'Decent reading'
            else if (this.book.pageCount > 500) readingLevel = 'Long reading'
            return readingLevel
        },
        bookCondition() {
            const year = new Date().getFullYear()
            if (year - this.book.publishedDate < 1) return ', New!'
            else if (year - this.book.publishedDate > 10) return ', Veteran Book'
            return ''
        },
        priceColor() {
            if (this.book.listPrice.amount > 150) return 'red'
            else return 'green'
        },
        isBookOnSale() {
            return this.book.listPrice.isOnSale
        },
        bookDescription() {
            let description = this.book.description
            description = description.split(' ')

            if (this.showMoreDesc || description.length <= 10) return this.book.description

            description = description.splice(0, 10)

            const descriptionToShow = description.join(' ')
            return descriptionToShow + '...'
        }
    },
    created() {
        // get id from route and use
        const { bookId } = this.$route.params;
        console.log('bookId', bookId);
        booksService.getById(bookId)
            .then(book => this.book = book);
    },
    mounted() {
    },

};

// { "id": "1y0Oqts35DQ", "title": "at viverra venenatis",
//  "subtitle": "gravida libero facilisis rhoncus urna etiam",
//   "authors": ["Dr. Seuss"], "publishedDate": 1999, 
//   "description": "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant", 
//   "pageCount": 972, "categories": ["Computers", "Hack"], 
//   "thumbnail": "http://coding-academy.org/books-photos/2.jpg", "language": "he", 
// "listPrice": { "amount": 108, "currencyCode": "ILS", "isOnSale": false } }