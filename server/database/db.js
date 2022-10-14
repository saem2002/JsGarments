import mongoose from 'mongoose';


const Connection = ()=> {
    try {
        mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;