const express = require( 'express' );
const FamilyModel = require( '../models/familyModels' );
const fs = require("fs");


  // Create a new family
  const createFamily = async (req, res) => {
    const { fatherName, motherName, children } = req.body;
    const filenames = req.files["childrenImage"].map((file) => file.filename);
  
    const family = new FamilyModel({
      fatherName,
      motherName,
      children,
      childrenImage: filenames,
    });
    try {
          const savedFamily = await family.save();
          if ( !savedFamily ) {
              res.status( 400 ).json( {
                  message: "family not saved."
              })
          } else {
              res.status( 201 ).json( {
                  message: "Family created successfully",
                  data: savedFamily
              })
          }
      } catch ( e ) {
          res.status( 500 ).json( {
              message: e.message
          })
      }
  }
  

// Get all families
const getall = async ( req, res ) => {
  try {
      const family = await FamilyModel.find();
      if ( family.length === 0 ) {
          res.status( 404 ).json( {
              message: "No family found."
          })
      } else {
          res.status( 200 ).json( {
              message: "family",
              data: family,
              totalFamily: family.length
          })
      }
  } catch ( e ) {
      res.status( 500 ).json( {
          message: e.message
      })
  }
}
  
// Get a one family 
    const getOne = async(req, res) =>{
    const familyId = req.params.id;
    const family = await FamilyModel.findById( familyId );
    try {
        if ( !family) {
            res.status( 404 ).json( {
                message: "No child found."
            })
        } else {
            res.status( 200 ).json( {
                data: family,
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
  }


  
  // Update an existing family
  const updateF = async ( req, res ) => {
    const familyId = req.params.id;
    const family = await FamilyModel.findById( familyId );
    try {
        const { fatherName, motherName, children } = req.body;
        const bodyData = {
          fatherName: fatherName || family.fatherName,
          motherName: motherName || family.motherName,
          children: children || family.children,
          childrenImage: family.childrenImage
        }

        if ( req.files && req.files[ "childrenImage" ] ) {
            // bodyData.childrenImage.forEach((image) => {
            const oldChildrenImagePath = family.childrenImage.map( (image) => `uploads/${ image }`);
            oldChildrenImagePath.forEach( (oldImage) =>{
            if ( fs.existsSync( oldImage ) ) {
                fs.unlinkSync(oldImage)
            }
        });
            // bodyData.childrenImage = req.files.childrenImage[ 0 ].filename;
            bodyData.childrenImage = req.files["childrenImage"].map( (file) => file.filename);
        }
        const newChildrenImage = await FamilyModel.findByIdAndUpdate( familyId, bodyData, { new: true } )
            if ( newChildrenImage ) {
                res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: newChildrenImage
                })
            } else {
                res.status( 404 ).json( {
                    message: "Not found"
                })
            }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }

}

  
  // Delete a family
  const deleteF = async ( req, res ) => {
    const familyId = req.params.id;
    const family = await FamilyModel.findById( familyId );
    try {
            const oldFamilyImagePath = `uploads/${ family.familyImage }`
            if ( fs.existsSync( oldFamilyImagePath ) ) {
                fs.unlinkSync( oldFamilyImagePath )
            }
        const deletedFamily = await FamilyModel.findByIdAndDelete( familyId );
        if ( deletedFamily ) {
            res.status( 200 ).json( {
                message: "Family profile Deleted successfully"
            })
        } else {
            res.status( 404 ).json( {
                message: "Family not deleted "
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

  module.exports = {
    getall,
    createFamily,
    getOne,
    updateF,
    deleteF
  }


  
  