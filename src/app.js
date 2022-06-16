const optionButtons = document.getElementsByClassName('option')
const feed = document.getElementById('feed')

let API_URL = "";
let title = "BBC";

Array.prototype.forEach.call(optionButtons, option => {

    option.addEventListener('click', () => {
        const { query } = option.dataset
        API_URL = `${window.location.href}/${query}`
        const title = option.innerHTML || query[0].toUpperCase() + query.replace(/^\w/g, "")
        feed.innerHTML= `<h2 class="feed-title">${title} News Flow</h2>`
        fetchNews(API_URL)
    })
})

feed.innerHTML= `<h2 class="feed-title">${title} News Flow</h2>`

const fetchNews = (url) => {

    const alert = document.createElement('div')
    alert.setAttribute("class", "alert-message")
    alert.innerHTML = "Please wait\nPage is loading...";
    document.body.insertAdjacentElement("beforeend", alert)

    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(object => {
            // eliminate unintended blank queries
            if(object.title?.length > 1) {
                feed.innerHTML += `
                    <div class="feed-container">
                    <a href="${object.url}" style="text-decoration: none;" ><h3>${object.title}</h3></a>
                    </div>`
            }
            const alertMessage = document.querySelector('.alert-message')
            if(alertMessage) return document.body.removeChild(alertMessage)
        })
    })
    .catch(err => {        
        const div = document.createElement('div')
        div.setAttribute("class", "alert-message")
        div.innerHTML = "Please refresh the page";
        document.body.insertAdjacentElement("beforeend", div)
        
        console.log(err)  
    })
}
