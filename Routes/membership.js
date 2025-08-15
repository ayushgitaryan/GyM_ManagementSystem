const express= require("express")

const router= express.Router();
const MembershipController=require('../Controller/membership');

const auth=require('../Auth/auth');

router.post('/add-membership',auth,MembershipController.addMembership)
router.get('/get-membership',auth,MembershipController.getmembership)



module.exports= router;