const Clarifai = require('clarifai');

// Initializing Clarifai API with an API key
const app = new Clarifai.App({
    apiKey: "78614678cf8b43988ffe0786cba7fc9a",
});

const handleApiCall = (req, res) => {
    app.models.predict('face-detection', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to set entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}