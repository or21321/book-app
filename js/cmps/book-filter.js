export default {
    template: `
    <section class="book-filter main-layout">
        <!-- <label>Search:</label> -->
        <!-- why should i have this label? dont like it -->
        <span><img src="icons/search.png"></span>
        <input v-model="filterBy.title"
         type="text" @input="filter" 
         placeholder="Search...">
        <input type="number"
            placeholder="Min Price"
            @input="filter"
            v-model.number="filterBy.priceMin">

        <input type="number"
            placeholder="Max Price"
            @input="filter"
            v-model.number="filterBy.priceMax">
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                priceMin: -Infinity,
                priceMax: Infinity
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        }
    }
};