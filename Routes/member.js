const express= require("express")

const router= express.Router();

const MemberController =require('../Controller/member');
const auth=require('../Auth/auth')

router.get('/all-member',auth,MemberController.getAllMember);

router.post('/register-member',auth,MemberController.registerMember);
router.get('/searched-member',auth,MemberController.searchedMember);

router.get('/monthly-member',auth,MemberController.monthlyMember);


module.exports=router;
