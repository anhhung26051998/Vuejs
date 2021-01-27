<template>
<div>
   <div class="row mt-3 mb-3">
    <div class="col-3">
    <input 
     class="form-control"
     type="text"
     placeholder="Tên hoặc mã nhân viên"  
     v-model="searchkey"
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
        <b-button variant="outline-success" v-on:click="showModal">Thêm</b-button>
    </div>
   </div>
   <div class="row">
       <div class="col-12">
         
         <b-table :items="datatable"  :fields="fields" hover  >
        <template #cell(index)="data">
        {{ data.index + 1 }}
        </template>
             <template #cell(Id)="data">
               
          <button class="btn btn-outline-primary mb-2" v-on:click="updateStaff(data.value)"> Sửa</button>
          <button class="btn btn-outline-danger" v-on:click="removeStaff(data.value)"> Xóa</button>
          </template>
             <template #cell(Sex)="data">
        <p >{{ data.value?"Nam":"Nữ" }}</p>
      </template>
         </b-table>
         
       </div>
   </div>
<div class="row">
  <div class="col-12">
 <b-pagination v-model="page"  pills :total-rows="rows"  :per-page="pageSize" align="right" v-on:input="fetch"></b-pagination>
</div>
</div>
<div>

  <b-modal id="modal-1" ref="my-modal" title="Thêm nhân viên" ok-title="Save" ok-variant="success" v-on:ok="addStaff">
     <form style="width:100%">
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Tên nhân viên</label>
                        <input type="text" class="form-control" id="name" v-model="staff.FullName">
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Số điện thoại</label>
                        <input class="form-control" id="phone" v-model="staff.Phone">
                    </div>
                    
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Giới tính </label>
                        <div>
                            <b-form-radio v-model="staff.Sex"  name="some-radios" value="true">Nam</b-form-radio>
                            <b-form-radio v-model="staff.Sex"  name="some-radios" value="false">Nữ</b-form-radio>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Ngày sinh</label>
                        <b-form-datepicker
                        v-model="staff.Birthday"
                        placeholder="Ngày sinh"
                           id="datepicker-dateformat2"
                           :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                             locale="vi"
                        ></b-form-datepicker>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Địa chỉ</label>
                        <input class="form-control " id="adress" v-model="staff.Adress">
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Phòng ban</label>
                          <b-form-select v-model="staff.Department_id" :options="options"></b-form-select>
                    </div>
                </form>
  </b-modal>
    <b-modal id="modal-2" ref="my-modal" title="Thông báo">
    <p class="my-4">Bạn có chắc chắn muốn xóa?</p>
  </b-modal>
</div>
</div>
</template>
<script>
import API from '../api/staff.js'
export default {
    name:"Staff",
    components:{
    },
    created(){
        this.fetch();
        this.getListDepartment();
    }
    , data(){
        return{
        selected:null,
         fields: [
            {
            key: 'index',
            label: 'STT',
            sortable: true,
          },
           {
            key: 'Code',
            label: 'Mã Nhân viên',
            sortable: true,
          },
          {
            key: 'FullName',
            label:"Họ tên",
            sortable: true
          },
         {
            key: 'BirthdayStr',
            label: 'Ngày sinh',
            sortable: true,
          },
          {
            key: 'Sex',
            label: 'Giới tính',
            sortable: true,
          },
          {
            key: 'Phone',
            label:"Số điện thoại",
            sortable: true
          },
          {
            key: 'Adress',
            label:"Địa chỉ",
            sortable: true
          },{
            key: 'Department',
            label:"Phòng ban",
            sortable: true
          },
          {
            key: 'Id',
            label:"Function",
          },
        ],
        phone:"",
        searchkey:"",
        page:1,
        rows:0,
        pageSize:5,
        options: [
          { value: null, text: 'Phòng ban' },
        ],
        datatable:[],
        isUpdate:false,
        staff: {
        Id:0,
        FullName:"",
        Phone:"",
        Sex:true,
        Adress:"",
        Birthday:"",
        Department_id:null
            }
        }
       
    },
    methods:{
        fetch(){         
            API.getAllStaff({page:this.page,pageSize:this.pageSize,department_id:this.selected,phone:this.phone,searchkey:this.searchkey}).then((rs)=>{
            this.datatable=rs.data.data; 
            this.rows=rs.data.rowCount;   
             console.log(this.datatable)
            });
     
        },
        showModal(){
          this.staff={
        Id:0,
        FullName:"",
        Phone:"",
        Sex:true,
        Adress:"",
        Birthday:"",
        Department_id:null
            }
        this.$refs['my-modal'].show()
        },
        getListDepartment(){
          API.getListDepartment().then((rs)=>{
            rs.data.forEach(element => {
              this.options.push({value:element.Id,text:element.Value})
            });
          })
        },
        addStaff(){
         if(this.isUpdate){
            API.updateStaff(this.staff).then((rs)=>{
            if(rs.data.Status==1){
                this.$toastr.s(rs.data.Message);
                this.fetch();
            }
            else{
              this.$toastr.e(rs.data.Message);
            }
          })
         }else{
           API.addStaff(this.staff).then((rs)=>{
            if(rs.data.Status==1){
                this.$toastr.s(rs.data.Message);
                this.fetch();
            }
            else{
              this.$toastr.e(rs.data.Message);
            }
            this.isUpdate=false;
          })
         }
         
         
        },
        showModalConfrim(Id){
        this.staff.Id=Id;
        this.$refs['my-modal'].show()
        }
        ,
          removeStaff(Id)
          {
            console.log(Id);
          },
          updateStaff(Id){
            let data=this.datatable.filter(x=>x.Id==Id)[0];
            data.Birthday=data.Birthday.slice(0,10);
            this.staff=data;
            this.isUpdate=true,
            this.Id=Id;
            this.$refs['my-modal'].show()
            
          }
    }
}
</script>