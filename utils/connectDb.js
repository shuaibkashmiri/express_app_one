const mongoose =require('mongoose');

const connectDb =async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/newDb')
        console.log('Database Connected!')
        
    } catch (error) {
        console.log('error')
    }
}

module.exports=connectDb;