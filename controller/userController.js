
const jwt = require('jsonwebtoken');
const model = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwtMw = require("../middleware/userMiddleware")
const { default: mongoose } = require('mongoose');

exports.createUser = async (req, res) => {
    try {


        const { name, email, password } = req.body;
        const authenticationHeader = req.headers.authentication;

        const userExist = await model.findOne({ email })
        // res.send(typeof(email) == undefined ||typeof(name) == undefined ||typeof(password) == undefined );
        if (!email || !name || !password) {
            //!email is equivalent to email === undefined
            res.send("Enter valid data");
        }
        else if (userExist) {
            res.send("User Already Exist")
        }
        else if (!authenticationHeader) {
            res.send("Enter Secret key plss for authorization")
        }
        else {
            const passbCrypt = await bcrypt.hash(password, 10);
            const token = await jwtMw.sign(req.body, authenticationHeader);
            const addUser = new model({ name: name, email: email, password: passbCrypt });
            await addUser.save();
            res.status(200).send("All Good" + "\nRemeber your token and Secretkey always: \n Token: " + token + "\nSecretKey: "+ authenticationHeader)
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "internal server error" })
    }
}

exports.loginUser = async (req, res) => {
    
    
    try {
        const { email, password } = req.body;

        
       

                const userExist = await model.findOne({ email });
                if (userExist) {
                        await bcrypt.compare(password, userExist.password, (err, result) => {
                        if (err) {
                            console.error(err);
                        }
                        else if (result === false) {
                            res.send("Password doesn't matches")
                        }
                        else {
                            res.status(200).send("password matched" + "\nthe object is " + userExist)

                        }

                    });

                }
            
        }

    
    catch (error) {
        console.log(error);
        res.send(500).send("ERRORRRRRR")
    }
}

exports.findAllUser = async (req, res) => {
    try {
        const findUsers = await model.find();
        res.status(200).send(findUsers);
    }
    catch (e) {
        console.log(e);
        res.send(500).send("ERRORRRRRR")

    }
}

exports.findSingleUser = async (req, res) => {
    try {
        // can be accesed through req.body as well
        // const findUser = await model.findById(req.params.id);
        const findUser = await model.find({ _id: req.params.id });//both can be applicable

        //const findUser = await model.find(req.params); 
        //this line can run and work if the line userRoutes.get('/findSingleUser/:_id', findSingleUser);
        //on userRoute.js file get uncomment

        //all 3 applicable
        res.status(200).send(findUser);
    }
    catch (e) {
        console.log(e);
        res.send(500).send("ERRORRRRRR")

    }
}