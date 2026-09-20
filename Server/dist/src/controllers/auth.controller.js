import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";
import generateToken from "../utlis/generateTokens.js";
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    let isMatch = false;
    if (admin.password) {
        isMatch = admin.password === password;
    }
    if (!isMatch && admin.passwordHash) {
        try {
            isMatch = await bcrypt.compare(password, admin.passwordHash);
        }
        catch {
            isMatch = false;
        }
    }
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    const token = generateToken(res, admin._id.toString());
    const adminData = {
        id: admin._id.toString(),
        username: admin.email || admin.name,
        email: admin.email,
        name: admin.name,
    };
    res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token,
        admin: adminData,
    });
});
export const me = asyncHandler(async (req, res) => {
    const user = req.user;
    const adminId = user?._id || user?.id;
    const admin = await Admin.findById(adminId).select("-password -passwordHash");
    if (!admin) {
        res.status(404);
        throw new Error("Admin not found");
    }
    res.status(200).json({
        id: admin._id.toString(),
        _id: admin._id.toString(),
        username: admin.email || admin.name,
        email: admin.email,
        name: admin.name,
    });
});
