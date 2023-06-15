const app = require( './app' );
const PORT = 5060;

app.listen( PORT, () => {
    console.log(`Server is listening to port: ${PORT}`);
})