import fs from "fs";
import sass from 'node-sass';

/* SASS render at server startup */
sass.render({
    file: "./public/css/style.scss",
    outFile: "./public/css/style.css",
    outputStyle: "expanded"
}, function(error, result) { // node-style callback from v3.0.0 onwards
    if(error){
        console.log(error);
        return;
    }
    // No errors during the compilation, write this result on the disk
    fs.writeFile("./public/css/style.css", result.css, function(err){
        if(err){
            console.log(err);
        }
    });
});
/* End of SASS render */

export default function pageGenerator(path, args={}) {
    /*
    Function generating a page
        - open header and content path 
        - give data to template function
    @PRE:
        path - String: The path of the content page
        args - object: Each key of the object is a parameter to the page generation (title, styleSheets, scripts)
    @POST:
        Generated page
    */
    let header = "";
    try {
        if (fs.existsSync("./pages/header.html")) {
            header = fs.readFileSync("./pages/header.html");
        }
    } catch(err) {
        console.error(err);
    }

    let content = "";
    try {
        if (fs.existsSync(path)) {
          content = fs.readFileSync(path);
        }
    } catch(err) {
        console.error(err)
    }

    return template(header, content, args);
}

function template(header = "", content = "", args = {}) {
    /*
    Function generating a page from a template
        - Parse styleSheets urls and scripts urls
        - Create HTML page from scripts, styleSheets and args
    @PRE:
        header - String: The HTML header of the page
        content - String: The HTML content of the page
        args - object: Each key of the object is a parameter to the page generation (title, styleSheets, scripts)
    @POST:
        Generated HTML code
    */
    let stylesSheets = "";
    if (args.styleSheets) {
        args.styleSheets.forEach(style => {
            stylesSheets += `<link rel="stylesheet" href="${style}">`;
        });
    }
    let scripts = "";
    if (args.scripts) {
        args.scripts.forEach(script => {
            scripts += `<script src="${script}"></script>`;
        });
    }
    return `<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${args.title ?? ""}</title>
        <link rel="stylesheet" href="/css/style.css">
        ${stylesSheets}
    </head>
    <body>
        <header>${header}</header>
        <div class="container">${content}</div>
        <script src="/js/main.js"></script>
        ${scripts}
    </body>
    </html>`;
}