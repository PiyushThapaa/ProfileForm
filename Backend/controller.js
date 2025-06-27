import { Profile } from "./model.js";

export const profileUpdate = (req, res, next) => {
    try {
        const { username, password, dob, gender, profession, address, country, city, state, subscription, newsletter } = req.body;
        const photo = req.file;
        if (!photo) return res.status(401).json({
            success: false,
            message: "Enter photo"
        })
        let profile = Profile.create({
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
        if (!profile) return res.status(404).json({
            success: false,
            message: "Profile not created"
        })
        return res.status(201).json({
            successs: true,
            message: "Profile created"
        })
    } catch (err) {
        return res.status(404).json({
            successs: false,
            message: err.message || "Internal Server Error"
        })
    }
}