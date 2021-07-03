//you may want to use this for the optional challenge
import fs from "fs"
import _ from "lodash"

const articlesPath = "articles.json"

class Article {
  constructor({ title, url, description }) {
    this.title = title
    this.url = url
    this.description = description
  }

  static findAll() {
    const articlesData = JSON.parse(fs.readFileSync(articlesPath))
    console.log(articlesData)
    const articlesArray = articlesData.articles
    const articleInstances = articlesArray.map((articleData) => {
      return new Article(articleData)
    })
    return articleInstances
  }
  save() {
    //get a list of all of the existing articles
    const existingArticles = this.constructor.findAll()
    //add my new articles to that list
    existingArticles.push(this)
    //rewrite the file to have the updated list of articles
    const articlesData = { articles: existingArticles }
    fs.writeFileSync(articlesPath, JSON.stringify(articlesData))
  }
}
//     static findAll () {
//         const articlesData = JSON.parse(fs.readFileSync(articlesPath)).articles
//         const articles = articlesData.map(articles => {
//             return new Article(articles)
//         })
//         return articles
//     }
//     save() {
//         const existingArticles = this.constructor.findAll()
//         existingArticles.push(this)
//         fs.writeFileSync(articlesPath, JSON.stringify({ articles: existingArticles}))
//     }
// }

export default Article
