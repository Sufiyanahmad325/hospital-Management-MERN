export const asyncHandler =(requestHandler) => {
    return async(req,res, next)=>{
        Promise.resolve(requestHandler(req,res, next))
        .catch((err)=>next('this is your error ====> ' + err))
    }
}