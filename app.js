const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const jsYaml = require('js-yaml');

const port = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const schema = jsYaml.load(fs.readFileSync(path.join(__dirname, 'openapi.yaml')));

// route
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(schema));

// Error Handling Middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            success: (error.status == 200) ? true : false,
            message: error.message
        }
    });
});

app.get('*', (req, res) => res.status(200).send({
    message: 'Nothing but everything!'
}));

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
