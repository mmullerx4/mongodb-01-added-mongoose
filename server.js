const express = require('express');
const app = express();

// Parse JSON bodies (application/json)
app.use(express.json());

// Parse URL-encoded bodies (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
