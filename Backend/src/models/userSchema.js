import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "doctor", "patient"], default: "patient" },
    },
    { timestamps: true }
);





userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id, role: this.role }, 
        process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User", userSchema);