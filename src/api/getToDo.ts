import axios from "axios";

type paramsType = {
    page? : number
    onSuccess : (arg:any)=>void

}

export const getToDo = (apiParams : paramsType)=>{

    const {page=1, onSuccess} = apiParams;


    axios({
        baseURL:"https://63e9fac43363c870035ee1fa.mockapi.io/algobulls/todo",
        method:"GET",
        // params:{
        //     page:page,
        //     limit:9
        // }
        
        
    }).then((response)=>{    
        onSuccess(response.data);

    }).catch((error)=>{
        console.log(error);
        
    }
)}