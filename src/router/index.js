
import Staff from '../pages/Staff.vue'
import Department from '../pages/Department.vue'
const routes= [
    {path: '/', component: Department,name:"Home"},
    {path: '/Staff', component: Staff,name:"Staff"},
    {path: '/Department', component: Department,name:"Department"}
];


export default routes;