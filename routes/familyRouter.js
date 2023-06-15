const express = require( 'express' );
const router = express.Router();
const upload = require("../utils/multer")

const {createFamily,getall, getOne, updateF, deleteF} = require("../controller/familyController")

router.post( '/families', upload.fields( [ { name: "childrenImage", maxCount: 3 } ] ), createFamily )

router.get( '/families', getall );

router.get( '/families/:id', getOne );

router.put( '/families/:id', upload.fields( [ { name: "childrenImage", maxCount: 3 } ] ), updateF );

router.delete( '/families/:id', deleteF );






module.exports = router;