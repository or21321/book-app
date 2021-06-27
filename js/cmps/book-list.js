import bookPreview from './book-preview.js'

export default {
    props: ['books'],
    template: `
    <ul class="book-list main-layout">
        <!-- <li v-for="book in books" :key="book.id" class="book-preview-container"> -->
            <book-preview  v-for="book in books" :key="book.id" :book="book"/>
            <!-- <book-preview :book="book" @click.native="log(book.id)" /> -->
            <!-- <div class="actions">
                <button @click="remove(book.id)">X</button>
                <-- <button @click="select(book)">Details</button> -->
                <!-- <router-link class="details-link" :to="'/book/'+book.id">Details</router-link> -->
            <!-- </div> -->
        <!-- </li> --> 
    </ul>
    `,
    methods: {
    },
    created() {
        console.log(this.books, 'from list')
    },
    components: {
        bookPreview
        // FIX
    }

};

