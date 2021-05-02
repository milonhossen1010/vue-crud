$(document).ready(function () {

    //Form prevent default
    $('form').submit(function (e) {
        e.preventDefault();
       
    });

    $('#myForm').validate();
});




/**
 * Vue JS code
 */
let root = new Vue({
    el: "#root",
    data: {
        name: null,
        email: null,
        cell: null,
        users: [],
        alert: {
            danger: false,
            success: false,
            warning: false,
            mess: null
        },
        edit: {
            name: null,
            email: null,
            cell: null,
        },
        update: {
            id:null,
            name: null,
            email: null,
            cell: null
        }
    },
    methods: {

        //Data insert
        insertData: function (data) {

            if (this.name == null || this.email == null || this.cell == null) {

                this.alert.danger = true;
                this.alert.success = false;
                this.alert.mess = "All fields are required!";

            }else {

                axios.get('inc/data.php?name=' + root.name + '&email=' + root.email + '&cell=' + root.cell + ' ').then(function (response) {
                    root.users = response.data;
                });

                this.name = null;
                this.email = null;
                this.cell = null;
                this.alert.success = true;
                this.alert.danger = false;
                this.alert.mess = "User added successful!";
            }

        },

        //Data get
        dataGet: function () {
            axios.get('inc/data.php').then(function (response) {
                root.users = response.data;
            });
        },

        //Data Delete
        dataDelete: function(i){
             
            if(confirm("Are you Sure?")){
                axios.get("inc/data.php?delete_id="+ i +"").then(function(response){
                    root.users = response.data;
                });

                this.alert.success=true;
                this.alert.mess = "Data delete successful!";
            }
           
        },

        //Data edit index
        dataEdit: function(id){
            axios.get("inc/edit.php?edit_id="+id+"").then(function(response){
                root.update.name= response.data.name;
                root.update.email= response.data.email;
                root.update.cell= response.data.cell;
                root.update.id= response.data.id;
            });
        },
        
        //Data update
        dataUpdate: function(){
            axios.get("inc/edit.php?id="+root.update.id+"&name="+root.update.name+"&email="+root.update.email+"&cell="+root.update.cell+"").then(function(response){
                 root.users = response.data;
                 $('#myModal').modal('hide');
                 root.alert.success=true;
                 root.alert.mess = "Data updated successful!";
            });
        }


    },



    created: function () {
        this.dataGet();
    }




});