const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Serve the Angular app from the dist directory
app.use(express.static(path.join(__dirname, './dist/project/browser')));

// Handle every route with index.html (for Angular's client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/project/browser/index.html'));
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
