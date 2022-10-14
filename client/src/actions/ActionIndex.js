
export const authUser= (data) =>{
    return{
        type:"ADDUSER",
        payload:{
            id:new Date().getTime().toString(),
            data:data
        }
    }
}
export const cartQuant = (data)=>{
    return {
        type:"CARTQUANT",
        payload:{
            data:data
        }
    }
}
export const cartQuantChange = ()=>{
    return {
        type:"CARTQUANTCHANGE",
    }
}
