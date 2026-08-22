const User = require('../model/User.js')
const Product = require('../model/Product.js')
const Order = require('../model/Order.js')


const getAdminStates = async (req , res) => {
    
    try {

        const totalUser = await User.countDocuments({ role : 'user' })
        const totalProduct = await Product.countDocuments({})
        const totalOrder = await Order.countDocuments({})
        
        const orders = await Order.find({})
        // This fetches all orders from MongoDB


        // orders.reduce() --> Take all the elements of an array and reduce them into a single value

        const totalRevenueData = orders.reduce( (acc , order) => acc + order.totalAmount , 0)
                                            /*acc = 0 (Initially)
                                            Accumulator
                                            It stores the running total. */

        res.json( {
            totalUser ,
            totalProduct , 
            totalOrder ,
            totalRevenue : totalRevenueData
        })

    } catch (error) {
        res.status(500).json( {
            message : "Server Error by API getAdminStates ",
            error
        })
    }
}

module.exports = {getAdminStates}