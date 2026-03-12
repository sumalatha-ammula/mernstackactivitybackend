import Note from "../models/Note.js"
import User from "../models/signUp.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function getAllNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt:-1}) // -1 will sort in desc
        res.status(200).json(notes)

    }catch(err){
        console.error("Error in geAllNotesController",err)
res.status(500).json({message:"Internal server error"})
    }
}

export async function signup(req, res){
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
export async function signin (req, res)  {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export async function updateNotes(req,res){
    try {
        const {title,content}  = req.body;
const updateNote  = await Note.findByIdAndUpdate(req.params.id,{title,content},
    {
    new:true
});
if(!updateNote) return res.status(400).json({mesaage:"Id not found"})
await updateNote.save();
        
    } catch (error) {
        res.status(500).json({message:"Faild to create user", err})
    }
res.status(201).json({message : "Note Updated Sucessfully"})
}

export async function deleteNotes(req,res){
try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if(!deleteNote) res.status(400).json({messasge : "id not found"})
        res.json({message:"Note deleted successfuly"});

        res.status(500).json({message:"Faild to create user", err})
    
} catch (error) {
    
}
}

 export async function getNoteById(req,res){
    try {
        const getNote = await Note.findById(req.params.id);
        if(!getNote) res.status(400).json({message : "id not found"});
         res.json(getNote);


    } catch (error) {
               res.status(500).json({message:"Faild to create user", err})
 
    }

 }