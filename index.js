const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio');
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.static('src'));

const guardian_url = 'https://www.theguardian.com/uk'
const bbc_url = "https://www.bbc.com/news/world-60525350"
const nytimes_url = "https://www.nytimes.com/"
const washingtonpost_url = "https://www.washingtonpost.com/world/"

app.get('/', (req, res) => {
    res.json({message: "scrapper root index.js"})
})

app.get('/bbc', (req , res) => {
    axios(bbc_url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []            

            $('.gs-c-promo-body' , html).each(function() {
                const title = $(this).find('h3').text()
                const url = "https://www.bbc.com" + $(this).find('a').attr('href')
                articles.push({
                    title,
                    url,
                })
            })
            res.json(articles)    
        }) .catch(err => console.log(err)) 
})

app.get('/guardian', (req , res) => {
    axios(guardian_url)
        .then(response => {
            const html = response.data
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

            $('.css-9mylee', html).each(function() {
                let title = $(this).find('h3').text()
                const url = $(this).attr('href')
                                
                articles.push({
                    title,
                    url,
                })
            })            
            res.json(articles)
        }) .catch(err => console.log(err)) 
})

app.get('/washingtonpost', (req , res) => {
    axios(washingtonpost_url)
        .then(response => {           
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []            

            $('.story-headline', html).each(function() {
                const title = $(this).find('h3').text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url,
                })
            })
            res.json(articles)    
        }) .catch(err => console.log(err)) 
})

app.listen(PORT, () => console.log(`server runing on port ${PORT}`))