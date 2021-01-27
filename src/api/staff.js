import Axios from 'axios'

export default {
    getAllStaff(data){
    return Axios.get('/GetAllStaff?page='+data.page+'&pageSize='+data.pageSize+'&department_id='+data.department_id+'&phone='+data.phone+'&searchKey='+data.searchkey);
    },
    
    getListDepartment(){
     return Axios.get('/listDepartment');
    },
    addStaff(staffInputModel){
        return Axios.post('/addStaff',staffInputModel);
    },
    updateStaff(staffInputModel){
        return Axios.post('/updateStaff',staffInputModel);
    },
    deleteStaff(Id){
        return Axios.delete('/deleteStaff?id='+Id);
    }
}