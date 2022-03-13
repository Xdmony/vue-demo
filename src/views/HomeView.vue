<template>
  <div style="padding: 10px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="addUser">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="loadUsers">查询</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" sortable />
      <el-table-column prop="username" label="用户名"  />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="address" label="地址" />
      <el-table-column fixed="right" label="操作" >
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除此记录?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="mini" type="danger" >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[5, 10, 20]"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
      >
      </el-pagination>

      <el-dialog v-model="dialogVisible" title="Tips" width="30%">

        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex"  label="男">男</el-radio>
            <el-radio v-model="form.sex"  label="女">女</el-radio>
            <el-radio v-model="form.sex"  label="未知">未知</el-radio>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>

        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser"
        >确定</el-button
        >
      </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import request from '@/utils/request'

export default {
  name: 'HomeView',
  components: {

  },
  data() {
    return {
      form:{

      },
      dialogVisible:false,
      currentPage:1,
      pageSize:10,
      total:0,
      search:'',
      tableData:[

      ]
    }
  },

  created(){
    this.loadUsers();
  },

  methods: {
    loadUsers(){
      request.get("/user",{
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          search:this.search
        }
      }).then(res=>{
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    addUser(){
      this.dialogVisible = true;
      this.form = {};
    },
    saveUser(){
      if(this.form.id){
        request.put("/user", this.form).then(res=>{
          console.log(res)
          if(res.code === '0'){
            this.$message({
              type:"success",
              message: "操作成功"
            })
          }else{
            this.$message({
              type:"error",
              message: res.msg
            })
          }
        })
      }else{
        request.post("/user", this.form).then(res=>{
          console.log(res)
          if(res.code === '0'){
            this.$message({
              type:"success",
              message: "操作成功"
            })
          }else{
            this.$message({
              type:"error",
              message: res.msg
            })
          }
        })
      }
      this.loadUsers()
      this.dialogVisible = false;
    },
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true;
    },
    handleSizeChange(){
      this.loadUsers()
    },
    handleCurrentChange(){
      this.loadUsers()
    },
    handleDelete(){

    },
  }
}
</script>
