// const asyncHandler = (fn) => async (req, res, next) => {
//     return (req, res, next) => {
//         promise(fn(req, res, next)).catch(next)
//     }
// }

// export {asyncHandler}


const asyncHandler = (requestHandler) =>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
export {asyncHandler}


