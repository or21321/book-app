import { booksService } from "../services/books-service.js"
import { eventBus } from "../services/event-bus-service.js"
import { showMsg } from '../services/event-bus-service.js'
import reviewPreview from "./review-preview.js"

export default {
    props: ['bookId'],
    components: {
        reviewPreview
    },
    template: `
          <section  class="review-section">
            <div class="reviews-display" v-if="isReviewsDisOn">
                <button @click="isReviewsDisOn = false" class="close-reviews">X</button>
                <ul>
                    <review-preview v-for="(review, idx) in book.reviews" :review="review" :idx="idx"
                    @removeReview="removeReview"/>
                    <!-- <li  v-for="(review, idx) in book.reviews">
                        <div class="review">
                            <h2>{{review.name}}</h2> -->
                            <!-- <div> -->
                                <!-- <span>Reading date: {{formatDate(review.readAt)}}</span> -->
                                <!-- <span>Reading date: {{review.readAt}}</span> -->
                                <!-- <span>Rated: {{stars(review.rating)}}</span>
                                <p v-if="review.reviewText">Said: {{review.reviewText}}</p>
                                <p v-else>Didnt left a comment</p> -->
                            <!-- </div> -->
                        <!-- </div> -->
                        <!-- <button @click="removeReview(idx)">delete</button> -->
                    <!-- </li> -->
                    <button class="reviews-list-btn" @click.prevent="isReviewsDisOn = false">Back</button>
                </ul>
            </div>
            <div class="review-form" v-else>
            <button @click="closeReviewSection" class="close-reviews">X</button>
                <h3>Review</h3>
                <form>
                    <div>Name:
                        <input ref="reviewerName" type="text" v-model="review.name" placeholder="Full name">
                    </div>
                    <div>Reading date:
                        <input type="date" v-model="review.readAt" placeholder="Reading date">
                    </div>
                    <div>
                        <label for="rate">Rate:</label>
                        <span v-for="star in 5"  @click="saveRate(star)" > {{getAStar(star)}} </span>
                    </div>
                    <div class="review-text-area">
                        Let us know what you think:
                        <textarea v-model="review.reviewText" cols="30" rows="10"></textarea>
                    </div>
                        <button @click.prevent="addReview">Done</button>
                        <button class="reviews-list-btn" @click.prevent="isReviewsDisOn = true">Reviews-List</button>
                </form>
            </div>
        </section>
    `,
    data() {
        return {
            book: null,
            isReviewFormOn: false,
            review: {
                name: '',
                rating: '',
                readAt: Date.now(),
                reviewText: ''
            },
            isReviewsDisOn: false
        }
    },
    created() {
        console.log('created');
        booksService.getById(this.bookId)
            .then((book) => {
                console.log(this.bookId);
                console.log('book from service', book);
                this.book = book
            })
    },
    mounted() {
        const reviewerName = this.$refs.reviewerName
        reviewerName.focus()
        // reviewerName.select()
    },
    computed: {
    },
    methods: {
        closeReviewSection() {
            this.$emit('closeReviews')
        },
        saveRate(idx) {
            console.log(idx);
            this.review.rating = idx;
        },
        getAStar(idx) {
            console.log(idx + ' ' + this.review.rating);
            if (this.review.rating < idx) return '☆'
            return '★';
        },
        openReviewSection() {
            console.log('user reviewing..');
            this.isReviewFormOn = true
        },
        addReview() {
            console.log('adding a review');
            console.log('adding', this.review);
            if (!this.review.name || !this.review.rating) return alert('please fill your name and rate')
            booksService.addReview(this.book.id, this.review)
                .then(() => {
                    booksService.getById(this.book.id)
                        .then((book) => {
                            const msg = {
                                txt: 'Review added',
                                type: 'success',
                                link: this.book.id
                            };
                            // eventBus.$emit('show-msg', msg); 
                            showMsg(msg)
                            this.book = book
                            console.log('book after saving review', book);
                            this.isReviewsDisOn = true
                            this.review = {
                                name: '',
                                rating: '',
                                readAt: Date.now(),
                                reviewText: ''
                            }
                        })
                })
        },
        removeReview(reviewIdx) {
            console.log('removing review', reviewIdx);
            booksService.removeReview(this.book.id, reviewIdx)
                .then(() => {
                    const msg = {
                        txt: 'Deleted successfuly',
                        type: 'success'
                    };
                    eventBus.$emit('show-msg', msg);
                    booksService.getById(this.book.id)
                        .then((book) => {
                            this.book = book
                            if (!this.book.reviews || this.book.reviews.length === 0) {
                                this.review = {
                                    name: '',
                                    rating: '',
                                    readAt: Date.now(),
                                    reviewText: ''
                                },
                                    this.isReviewsDisOn = false
                            }
                        })
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again',
                        type: 'error'
                    };
                    // eventBus.$emit('show-msg', msg);
                    showMsg(msg)
                });
        },
    },

}
