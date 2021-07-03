import express from "express"
import Article from "../models/Article.js"

const articlesRouter = new express.Router()

articlesRouter.get("/", (req, res) => {
    const articles = Article.findAll()
//Express wants res.render to be given the template name, followed by an object with the variable name and the data you want to pass
    res.render("articles/index", { articles: articles })
})

articlesRouter.get("/new", (req, res) =>{
    res.render("articles/new")
})

articlesRouter.post("/", (req, res) =>{
//get the user's input from our body
const title = req.body.title
const url = req.body.url
const description = req.body.description
//or use object destructing:
//const {title, url, description} = req.body
//if I provide all necessary information,
    if(title && url) {
    //add it to the JSON file
    const newArticle = new Article({
        title, 
        url, 
        description
    })
    newArticle.save()
    //and redirect to  "/articles"
    // artices means it's URL
    res.redirect("/articles")
    }else {
    // ../new means file itself
    res.render("articles/new")
    }
return 
})
// articlesRouter.get("/", (req,res) =>{
//     res.render("articles/index", {articles: Article.findAll()})
// })

// articlesRouter.get("/new", (req, res) =>{
//     res.render("articles/new")
// })

// articlesRouter.post("/", (req, res) => {
// const articlesTitle = req.body.title
// const articlesURL = req.body.url
// const articlesDescription = req.body.description
// //const {title, url, description} = req.body
//     if(articlesTitle & articlesURL){
//     const newArticle = newArticle({
//      articlesTitle,
//      articlesURL,
//      articlesDescription
//     })
//     newArticle.save()
//     res.redirect("/articles")
//     } else {
//     res.render("articles/new")
//     }
// })
//
// if (articlesTitle.length === 0) {
//         res.redirect("articles")
//     } else if (articlesTitle) {
//         const newArticles = new Article({title: articlesTitle, url: articlesURL, description: articlesDescription})
//         newArticles.save()
//         res.redirect("articles")
//     } else {
//         res.render("articles/new")
//     }
// })
export default articlesRouter