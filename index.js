const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio');
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors())

const guardian_url = 'https://www.theguardian.com/uk'

const bbc_url = "https://www.bbc.com/news/world-60525350"

const nytimes_url = "https://www.nytimes.com/live/2022/06/11/world/russia-ukraine-war-news"

const washingtonpost_url = "https://www.washingtonpost.com/world/2022/06/11/russia-ukraine-war-putin-news-live-updates/"


app.get('/', (req, res) => {
    res.json({message: "scrapper root index.js"})
})

/** multipple request */
// axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
//   const responseOne = responses[0]
//   const responseTwo = responses[1]
//   const responesThree = responses[2]
//   // use/access the results 
// })).catch(errors => {
//   // react on errors.
// })


app.get('/bbc', (req , res) => {

    axios(bbc_url)
        .then(response => {
           
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []            

            $('.gs-c-promo-body' , html).each(function() {
                const title = $(this).find('h3').text()
                const url = "https://www.bbc.com" + $(this).find('a').attr('href')
                //const date =  $(this).find('time').attr('datetime')
                articles.push({
                    title,
                    url,
                    //date
                })
            })
            res.json(articles)    
        }) .catch(err => console.log(err)) 
})


app.get('/guardian', (req , res) => {
    axios(guardian_url)
        .then(response => {
            console.log(response);
            const html = response.data
            console.log(html);
            const $ = cheerio.load(html)
            const articles = []

            $('.fc-item__title', html).each(function() {
                const title = $(this).text()
                const url =  $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }) .catch(err => console.log(err))
})


app.get('/nytimes', (req , res) => {

    axios(nytimes_url)
        .then(response => {
           
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []            

            $('.live-blog-post-headline' , html).each(function() {
                const title = $(this).find('a').text()
                const url = nytimes_url + $(this).find('a').attr('href')
                //const date =  $(this).find('time').attr('datetime')
                articles.push({
                    title,
                    url,
                    //date
                })
            })
            res.json(articles)    
        }) .catch(err => console.log(err)) 
})


//https://www.washingtonpost.com/world/2022/06/11/russia-ukraine-war-putin-news-live-updates/
//            #link-4OXMKW7VIJHDBJOOJP3I6YXCYY
app.get('/washingtonpost', (req , res) => {

    axios(washingtonpost_url)
        .then(response => {
           
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []            

            $('.inline-story' , html).each(function() {
                const title = $(this).find('h2').text()
                const url = washingtonpost_url + "#" + $(this).attr('id')
                //const date =  $(this).find('time').attr('datetime')
                articles.push({
                    title,
                    url,
                    //date
                })
            })
            res.json(articles)    
        }) .catch(err => console.log(err)) 
})

app.listen(PORT, () => console.log(`server runing on port ${PORT}`))