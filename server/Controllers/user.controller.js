const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { userModel } = require("../Model/users.model");
const nodemailer = require('nodemailer');
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);


env.config()

const createAcc = async (request, response) =>{
    try{
        
        const {body} = request
        console.log(body);
        
        body.password = await bcrypt.hash(body.password,10)
        // console.log(body.password);
        
        const res = await userModel.create(body)

        if(!res){
            return response.status(400).send({message :"ID not found"})
        }
        // const token = jwt.sign({sub: res}, process.env.SEC_KEY , {expiresIn :"7d"})
        return response.status(200).send({message : "User created", res})
    }catch(err){
        console.log(err);
    }
}

const loginAcc = async(req,res) =>{
    try {
        const {body} = req;
        console.log(body);
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        if (user.disabled) {
            return res.status(403).send({ message: "Your account is disabled. Please contact support." });
          }
        const exist = await bcrypt.compare(password, user.password);
        if(!exist){
            return res.status(404).send({message: "passwords doesn't match"})
        }
        const token = jwt.sign({sub: user}, process.env.SEC_KEY, {expiresIn:"7d"});
        return res.status(200).send({message: "Logged In successfully", token, _id: user._id,})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Internal server error"})
        
    }
}

const sendEmail = async (req, res) => {
    // const {id} = req.userId
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
        const exist = await userModel.findOne({email})
        console.log(exist);
        if(!exist){
            return res.status(400).send({message:"Email id not registered"})
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'anjanae438@gmail.com',
                pass: 'xvxdzjzarptoityp'
            }
        });

        const mailOptions = {
            from: 'rajaneranhi@gmail.com',
            to: email,
            subject: "password recovery",
            text: `Your login password is: ${exist.confirmpassword}`
            
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Reset link sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
}

const AddAddress = async(req,res) =>{
    try {
        const {values, userId} = req.body;
        console.log(userId);
        console.log(values.phone);
        const user = await userModel.findById(userId);
            
        if(!user){
            return res.status(400).send({message: " User not found"})
        }
        const exist = await user.details.find((item) => item.phone === values.phone);
        if(exist){
            return res.status(400).send({message: "Duplicate mobile number exist"})
        }
        user.details.push(values);
        await user.save();
        const newAddress = user.details[user.details.length - 1];
        
        return res.status(200).send({message:"Address added", newAddress})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Addition failed' });
    }
}


const viewDetails = async(req,res) =>{
    try {
        const {userId} = req.params;
        console.log(userId);
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(400).send({message: "User not found"})
        }
        return res.status(200).send(user.details)
    } catch (error) {
        console.log(error);
        return req.status(500).send({message:"Internal server error", error})
    }
}


const Orders = async(req,res) =>{
    try {
        const {userId, products, shippingAddress, totalAmount} = req.body;
        console.log(products, shippingAddress, totalAmount);
        console.log("total Amount>>>>", totalAmount);
        

        const user = await userModel.findById(userId);
        if(!user){
            return res.status(400).send({message:"User not found"});
        }

       user.orders.push({products,shippingAddress, totalAmount });
       await user.save();
       return res.status(200).send({message: "Order Placed"})
        
    } catch (error) {
        console.log(error);
        return req.status(500).send({message:"Internal server error", error})
    }
}


const viewOrder = async(req,res) =>{
    try {
        const {userId} = req.params;
        console.log(userId);
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(400).send({message: "User not found"})
        }
        return res.status(200).send(user)
    } catch (error) {
        console.log(error);
        return req.status(500).send({message:"Internal server error", error})
    }
};

const viewuser = async(req,res) =>{
    try {
        const {userId} = req.params;
        console.log(userId);
        
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return req.status(500).send({message:"Internal server error", error})
    }
}


const cardPayment  = async (req,res)=> {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: 'Payment PAge',
                  },
                  unit_amount: 1500 * 100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/payment-success',
            cancel_url: 'http://localhost:5173/payment-cancel',
          });

          res.status(200).send({ url: session.url });

        //   return res.status(200).send({
        //     message: 'Payment successful',
        //     paymentIntentId: paymentIntent.id
        //   });

    } catch (error) {
        console.log(error);
        return res.status(500).send({message : "Payment failed"})
    }
}


const Profile = async(req,res) =>{
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const updatedSeller = await userModel.findByIdAndUpdate(
                    id,
                    { name, email },
                    { new: true }
        );
        res.status(200).json({ message: "Seller updated", updatedSeller });
    } catch (error) {
        console.log(error);
        return res.status(500).send({message : "Internal server error"})
    }
}
module.exports = {createAcc, loginAcc, sendEmail, AddAddress,viewuser, viewDetails, Orders, viewOrder, cardPayment, Profile}