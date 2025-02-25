1. installing ejs template --> npm i ejs express
2. what is ejs --> embedded js templating is a simple templating language that lets you generate HTML markup with   plain JavaScript.

3. app.render()
    First Parameter: The first parameter is the template or view you want to render. This could be a file path or a string containing the template.

    Second Parameter: The second parameter is an object where you define local variables that will be passed into the view. These variables can then be accessed and used within the template.

    Third Parameter: The third parameter is a callback function that takes two arguments: an error (if any occurs) and the rendered HTML. The callback function can handle the error if it occurs, and the rendered HTML can be returned or further processed.

    Here's a simple example to illustrate:
    ```
    const ejs = require('ejs');
    const template = '<h1>Hello, <%= name %>!</h1>';
    const data = { name: 'Alice' };

    ejs.render(template, data, (err, str) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Rendered HTML:', str);
    }
    });
    ```
    In this example:

    template is the string containing the EJS template.

    data is the object with the local variable name.

    The callback function logs either the error or the rendered HTML.