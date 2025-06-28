import { Profile } from "./model.js";
import { rm } from "fs"

export const profileUpdate = async(req, res, next) => {
    try {
        const { username, password, dob, gender, profession, address, country, city, state, subscription, newsletter } = req.body;
        const photo = req.file;
        if (!photo) return res.status(404).json({
            success: false,
            message: "Enter photo"
        })
        let profile = await Profile.create({
            username,
            photo: photo?.path,
            password,
            dob,
            gender,
            profession,
            address,
            country,
            city,
            state,
            subscription,
            newsletter
        })

        if (!username || !password || !dob || !gender || !profession || !address || ! country || !city || !state || !subscription || !newsletter) {
            rm(photo.path)
        }
        if (!profile) return res.status(404).json({
            success: false,
            message: "Profile not created"
        })
        return res.status(200).json({
            success: true,
            message: "Profile created"
        })
    } catch (err) {
        const photo = req.file;
        rm(photo.path)
         res.status(404).json({
            successs: false,
            message: err.message || "Internal Server Error"
        })
    }
}

export const username = async (req, res, next) => {
    try {
        const {username} = req.body;
        let isMatched = await Profile.findOne({username:username})
        if (isMatched) {
            return res.status(401).json({
                success:false,
                message:"Username already exist"
            })
        } else {
            return res.status(200).json({
                success:true,
                message:"Username available"
            })
        }
    } catch (err) {
        return res.status(404).json({
            successs: false,
            message: err.message || "Internal Server Error"
        })
    }
}

export const updatepass = async (req,res) => {
    try {
        const {username, currentpass, newpass} = req.body;
        const user = await Profile.findOne({username:username})
        if  (!user) return res.status(401).json({
            success:false,
            message:"User not found"
        })
        if (user.password == currentpass) {
            user.password = newpass
            await user.save()
            return res.status(200).json({
                success:true,
                message:"Password is changed"
            })
        } else {
            return res.status(401).json({
                success:false,
                message:"Password is not correct"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success:false,
            message:err.message || "Internal Server Error"
        })
    }
}