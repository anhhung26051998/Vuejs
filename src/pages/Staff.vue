<template>
<div>
   <div class="row mt-3 mb-3">
    <div class="col-3">
    <input 
     class="form-control"
     type="text"
     placeholder="Tên hoặc mã nhân viên"  
     />
    </div>
    <div class="col-3">
    <input 
     class="form-control"
     type="text"
     placeholder="Số điện thoại"  
     v-model="phone"
     />
    </div>
    <div class="col-3">
    <b-form-select v-model="selected" :options="options"></b-form-select>
    </div>
    <div>
          <b-button variant="outline-primary" class="mr-3" v-on:click="fetch">Tìm kiếm</b-button>
        <b-button variant="outline-success" >Thêm</b-button>
    </div>
   </div>
   <div class="row">
       <div class="col-12">
         <b-table :items="datatable" />
     <Table :datatable="datatable" text="Test"/>
       </div>
   </div>
</div>
</template>
<script>
import Table from '../components/Table.vue'
import API from '../api/staff.js'
export default {
    name:"Staff",
    components:{
      Table
    },
    created(){
        this.fetch();
    }
    , data(){
        return{
        selected:null,
        phone:"",
        options: [
          { value: null, text: 'Phòng ban' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ],
        datatable:[]
        }
    },
    methods:{
        fetch(){
            API.getAllStaff({page:1,department_id:null,phone:this.phone}).then((rs)=>{
            this.datatable=rs.data;     
            // console.log(this.datatable)        
            });
     
        }
    }
}
</script>