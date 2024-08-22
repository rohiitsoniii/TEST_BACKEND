const asyncHandler = (fn) => async (req, res, next) => {
    return (req, res, next) => {
        promise(fn(req, res, next)).catch(next)
    }
}

export {asyncHandler}