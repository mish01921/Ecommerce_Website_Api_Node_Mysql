import Review from "../models/reviewModel.js"

//1. Add Review

export const addReview = async (req, res) => {

    const id = req.params.id

    let data = {
        product_id: id,
        rating: req.body.rating,
        description: req.body.description
    }

    const review = await Review.create(data)
    res.status(200).send(review)

}

// 2. Get All Reviews

export const getAllReviews = async (req, res) => {

    const reviews = await Review.findAll({})
    res.status(200).send(reviews)

}
