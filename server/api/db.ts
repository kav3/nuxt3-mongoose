import mongoose from "../db"

export default (req, res) => mongoose.connection.readyState == 1 ? ":)" : ":("