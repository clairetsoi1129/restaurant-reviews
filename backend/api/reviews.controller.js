import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const reviewResponse = await ReviewsDAO.addReview(
                req.body.restaurant_id,
                userInfo,
                req.body.text,
                date,
            )
            res.json( {status: "success" } )
        } catch (err) {
            res.status(500).json( {error: err.message } )
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {

            const reviewResponse = await ReviewsDAO.updateReview(
                req.body.review_id,
                req.body.user_id,
                req.body.text,
                new Date(),
            )

            var {error} = reviewResponse
            if (error) {
                res.status(400).json( {error} )
            }

            if (reviewResponse.modifiedCount === 0){

            }
            res.json( {status: "success" } )

            if (reviewResponse.modifiedCount === 0){
                throw new Error("Unable to update review - user may not be original poster")
            }
        } catch (err) {
            res.status(500).json( {error: err.message } )
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewResponse = await ReviewsDAO.deleteReview(
                req.body.review_id,
                req.body.user_id,
            )
            res.json( {status: "success" } )
        } catch (err) {
            res.status(500).json( {error: err.message } )
        }
    }
}