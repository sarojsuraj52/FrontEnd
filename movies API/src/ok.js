
    let response = false
async function a(){

    if(true){
        
        setTimeout( ok = ()=>{
            // console.log('b')
            response = true
            return response
        },1000)
    }
    response =  ok()
    console.log(response)
}
a()