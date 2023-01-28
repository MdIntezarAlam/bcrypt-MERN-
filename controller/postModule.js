import User from "../modules/userModule.js"

export const commentOnpost = async (req, res) => {
    try {
        const post = await User(req.body)
        if (post) {
            return res.status(200).json({
                succss: true,
                message: "commnet Added",
                post
            })
        }
        await post.save()
    } catch (error) {
        res.status(500).json({
            succss: true,
            message: error.message,
        })
    }
}
