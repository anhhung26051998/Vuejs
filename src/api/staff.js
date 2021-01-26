import Axios from 'axios'
export default {
    getAllStaff(data){
    return Axios.get('/GetAllStaff?page='+data.page+'&department_id='+data.department_id+'&phone='+data.phone);
    }
}