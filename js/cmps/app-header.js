export default {
    template: `
    <header class="app-header-container">
        <div class="app-header main-layout">
            <div class="logo">
                <span>
                <span style='color: #4285f4'>A</span>
                <span style='color: #ea4335'>p</span>
                <span style='color: #fbbc05'>p</span>
                <span style='color: #4285f4'>s</span>
                <span style='color: #34a853'>u</span>
                <span style='color: #ea4335'>s</span>
                </span>
                <h3>Books</h3>
            </div>
            <nav>
                <!-- ? how to fix active styling -->
                <router-link to="/" active-class="active-link">Home</router-link>
                <router-link to="/book">Books</router-link>
                <router-link to="/about">About</router-link>
            </nav>
        </div>
    </header>
    `,
};
