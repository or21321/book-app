// import carEdit from './pages/car-edit.js';
import bookDetails from './pages/book-details.js'
import homePage from './pages/home-page.js'
import aboutPage from './pages/about.js'
import bookApp from './pages/book-app.js'
import aboutTeam  from './cmps/about-team.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {   
                name: 'Team',
                path: 'team',
                component: aboutTeam
            },
            // {
            //     path: 'service',
            //     component: aboutService
            // },
        ]
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const router = new VueRouter({ routes });