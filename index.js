
// Login System
// Please Create a Login System that must have these functionalities 
// 1. Login with JWT
// 2. Signup
// 3. Forgot Password
// 4. Update Profile (user can update his profile pic, email (if not already associated with another account), first name, last name, gender and DOB)
// 5. Change Password (After Login)

// also create a frontend with react JS


import { app } from "./app.js";
import { ConnectDb } from "./src/Db/index.js";

const port = process.env.PORT || 8001

ConnectDb().then().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((err) => {
    console.log("error while connecting to database", err)
})

