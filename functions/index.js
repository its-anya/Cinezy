module.exports = async function(req, res) {
    // Log the request payload for debugging
    console.log('Request payload:', req.payload);

    // Return a response
    res.json({
        message: 'Hello from Cinezy function!',
        timestamp: new Date().toISOString(),
        payload: req.payload
    });
}; 