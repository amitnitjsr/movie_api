const express = require('express');
const MovieRoute = express.Router();
let jwt = require('jsonwebtoken');
const moviedetails = require('../models/movieModel').default;

MovieRoute.use(async (req, res, next) => {
    next();
})

// Add movie details API
MovieRoute.post('/', async (req, res, next) => {

    let movieData = {
        name: req.body.name,
        director: req.body.director,
        popularity: req.body.popularity,
        genre: req.body.genre,
        imdb_score: req.body.imdb_score,
        created_on: req.body.created_on,
        created_by: req.body.created_by,
        poster: req.body.poster
    }
    try {
        const data = await moviedetails.query().insertGraphAndFetch(movieData);
        console.log('moviedata', data)
        const newData = await moviedetails.query();
        console.log('moviedata new', newData)
        res.send(data);
    }
    catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

// Get all movie list API
MovieRoute.get("/", async (req, res, next) => {
    let id = req.params.id;
    try {
        const data = await moviedetails.query();

        res.send(data);
    }
    catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

// Get movies Details By ID
MovieRoute.get("/:id", async (req, res, next) => {
    let id = req.params.id;

    try {
        // const data = await moviedetails.query().update(updataData).where('id', req.params.id);
        const newData = await moviedetails.query().
            where('id', id);
        // let tmp = newData.genre.toString()
        newData.genre = JSON.stringify(newData.genre)
        res.send(newData);
    }
    catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

// Edit movies Details
MovieRoute.put("/:id", async (req, res, next) => {
    let id = req.params.id;
    const updataData = {
        id: id,
        name: req.body.name,
        director: req.body.director,
        popularity: req.body.popularity,
        genre: req.body.genre,
        imdb_score: req.body.imdb_score
    }
    try {
        // const data = await moviedetails.query().update(updataData).where('id', req.params.id);
        const newData = await moviedetails.query().
            upsertGraphAndFetch(updataData, { relate: true, unrelate: false });
        res.send(newData);
    }
    catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

// Delete movie details by ID
MovieRoute.delete("/:id", async (req, res, next) => {
    let id = req.params.id;
    const idsToDelete = [];

    // if (req.params.id.indexOf(",") > -1) {
    //     req.params.id.split(",").map(x => idsToDelete.push(x));
    // } else {
    //     idsToDelete.push(req.params.id);
    // }
    // const responses = [];
    // const promisesToWait = [];
    // console.log(idsToDelete);
    // idsToDelete.forEach(element => {
    //     try {
    //         promisesToWait.push(moviedetails.query().where('id', element).patch());
    //     } catch (error) {
    //         responses.push({
    //             message: error.message,
    //             stack: error.stack
    //         });
    //     }
    // });
    // await Promise.all(promisesToWait).catch(error => {
    //     res.send(error);
    // });
    // res.send(responses);
    try {
        const numberOfDeletedRows = await moviedetails.query().deleteById(id);
        console.log(numberOfDeletedRows)
        res.send({
            response: 'data deleted successfully'
        });
    }
    catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

export default MovieRoute;
