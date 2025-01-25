// // const add=(a,b)=>a+b
// // // const sub=(a,b)=>a-b
// // // const mul=(a,b)=>a*b
// // // const div=(a,b)=>a/b


// // module.exports={add}
// // // module.exports={sub}
// // // module.exports={mul}
// // // module.exports={div}


// function arr(array) {
//     return array.map((elem)=>elem);
// }
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;
