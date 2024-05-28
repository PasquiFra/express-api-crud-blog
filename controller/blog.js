//importo le funzioni di read e write in functions.js
const { readJSONData, writeJSONData } = require('../functions');

//importo il file posts.json
let posts = require("../data/posts.json");

//imposto la rotta index
const index = (request, response) => {

    // Setto la risposta da inviare al client a seconda del formato che viene richiesto
    response.format({
        html: () => {
            let html = '<h1 class="text-center">Crypto Blog</h1><div>';
            posts.forEach(({ title, content, image, tags }) => {
                html +=
                    `<section>
                    <img style='width: 300px' src='/img/${image}'></img>
                    <h3>${title}</h3>
                    <p>${content}</p>
                `;
                html += '<div>';
                tags.map((tag) => {
                    html += `<span>#${tag.toLowerCase().replaceAll(' ', '-')} </span>`
                })
                html += `</div></div><hr>`;
            });
            html += '</section>';
            response.send(html);
        },
        json: () => {
            response.json({
                data: posts,
                count: posts.lenght
            })
        }
    })
}

// imposto la rotta show
const show = (request, response) => {

    const requiredSlug = request.params.slug;
    const postToShow = posts.find(post => requiredSlug === post.slug);

    const { title, image, content, tags } = postToShow;

    // Setto la risposta da inviare al client a seconda del formato che viene richiesto
    response.format({
        html: () => {
            if (postToShow) {
                let html = '<h1 class="text-center">Crypto Blog</h1><div>';
                html +=
                    `<section>
                    <img style='width: 300px' src='/img/${image}'></img>
                    <h3>${title}</h3>
                    <p>${content}</p>
                `;
                html += '<div>';
                tags.map((tag) => {
                    html += `<span>#${tag.toLowerCase().replaceAll(' ', '-')} </span>`
                })
                html += `</div></div><hr>`;

                html += '</section>';
                response.send(html);
            } else {
                res.status(404).send(`<h1>404 - Post not Found</h1>`);
            }
        },
        json: () => {
            if (postToShow) {
                response.json({
                    data: post,
                    count: post.lenght
                })
            } else {
                res.status(404).json({
                    status: 404,
                    error: 'Not Found',
                    description: `Post with slug ${requiredSlug} not found`
                })
            }
        }
    })
}

const newPost = (request, response) => {
    writeJSONData('posts', [...posts, request.body[0]]);
    response.send(`Post inviato correttamente`)
}

module.exports = {
    index,
    show,
    newPost,
}
