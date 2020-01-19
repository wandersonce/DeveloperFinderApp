const Dev = require('../models/Dev')
const axios = require('axios')
const parseStringAsArray = require('../ultils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        res.json(devs);
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            const sendSocketMessageTo = findConnections({
                latitude, longitude
            }, techsArray)
            sendMessage(sendSocketMessageTo, 'New-Dev', dev)
        }

        res.json(dev);
    },
    //Finish Later 
    //async update(){}, No allow to change github username
    //async destroy(){},
}