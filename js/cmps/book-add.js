import { booksService } from "../services/books-service.js"
import resultOptionsPreview from "./result-options-preview.js"

export default {
    template: `
                <section class="main-layout">
                    <div class="add-book-section" v-if="addBookClicked">
                        <button class="close-add-book-section-btn" @click="toggleAddSection">X</button>  
                        <h2>Search & Add new books!</h2>  
                        <form @submit.prevent.stop="searchBook">
                            <input type="text" v-model="bookToSearch" placeholder="Search books">
                            <button>Search</button>
                            <ul>    
                            <result-options-preview v-for="book in searchResBooksItems"
                             v-if="searchResBooksItems" :book="book" @addGoogleBook="addGoogleBook">
                             </result-options-preview>
                            </ul>
                        </form>
                    </div>
                        <div class="open-add-book-section-btn" v-else @click="toggleAddSection">➕</div>
                </section>
    `,
    data() {
        return {
            addBookClicked: false,
            bookToSearch: null,
            searchResBooksItems: null
        }
    },
    components: {
        resultOptionsPreview
    },
    created() {

    },
    computed: {

    },
    methods: {
        addGoogleBook(googleBook) {
            console.log('@addGoogleBook, googleBook:', googleBook);
            booksService.addGoogleBook(googleBook) 
                .then(() => {   
                    this.$emit('googleBookAdded')
                })
        },
        toggleAddSection() {
            this.addBookClicked = !this.addBookClicked
            this.searchResBooksItems = null
        },
        searchBook() {
            booksService.searchOnGoogleBooks(this.bookToSearch, this.renderOptions)
        },
        // on resolve from searchOnGoogleBooks - should i instead use .then?
        renderOptions(books) {
            console.log('books from cb - attributed to result-options', books);
            this.searchResBooksItems = null
            this.searchResBooksItems = books.items
        },
    },
}