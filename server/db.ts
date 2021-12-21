import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('Db connected')
});

mongoose.connection.on('disconnected', () => {
    console.log('Db disconnected')
});

mongoose.connection.on('reconnected', () => {
    console.log('Db reconnected')
});

mongoose.connect(process.env.DB, { useNewUrlParser: true }, function (err) {
    if (err)
        console.log(err)
})

export default mongoose;