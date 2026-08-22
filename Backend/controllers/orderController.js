const Order = require("../model/Order");
const sendEmail = require('../utils/sendEmail.js')

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (!items || items.length === 0 || !totalAmount || !address) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    // Check every product exists
    /*for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found : ${item.product}`,
        });
      }

      // Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }
      */

    
      const order = await Order.create({
        user: req.user._id,

        items: items.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price,
        })),

        totalAmount,
        address,
        paymentId,
    });
    // await order.save()

    const message = `
    Dear ${req.user.name},

    🎉 Thank you for shopping with Morphix!

    Your order has been created successfully.

    ==========================================
    🛒 ORDER DETAILS
    ==========================================

    Order ID      : ${order._id}
    Total Amount  : ₹${totalAmount}
    Payment ID    : ${paymentId}
    Order Status  : ${order.status.toUpperCase()}

    ==========================================
    📍 SHIPPING ADDRESS
    ==========================================

    ${address.fullName}
    ${address.street}
    ${address.city}
    ${address.country}
    ${address.postalCode}

    ==========================================

    Your order is currently being processed by our team.

    You will receive another email as soon as your order has been shipped.

    Thank you for choosing Morphix.

    Best Regards,

    Morphix Team
    www.morphix.com`;

    await sendEmail(req.user.email , 'Your order created' , message)

    return res.status(201).json({
      success: true,
      message: "Order create successfully",
      order,
    });

    
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



const myOrders = async (req, res) => {
  try {

    const orders = await Order.find({user: req.user._id,})
      .populate("items.productId" , "name price")
      res.json(orders)

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


const getOrders = async (req, res) => {

  try {

    const orders = await Order.find({})
      .populate("user", "id name")
      res.json(orders)    

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


const updateOrderStatus = async (req, res) => {

  try {

    const {status} = req.body
    const order = await Order.findById(req.params.id);

    if(order) {
      order.status = status
      await order.save()
      res.json( {
        message : "order status updated",
        order
      })
    }
    else {
      res.status(404).json( {
        message : "Order Not found"
      })
    }


  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// const deleteOrder = async (req, res) => {

//   try {

//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     await order.deleteOne();

//     return res.status(200).json({
//       success: true,
//       message: "Order deleted successfully",
//     });

//   } catch (error) {

//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });

//   }
// };

module.exports = {
  createOrder,
  myOrders,
  getOrders,
  updateOrderStatus,
};