const Member=require('../Modals/member');
const Membership=require('../Modals/membership');

exports.getAllMember=async(req , res)=>{
    try{
       const {skip,limit}=req.query;
       const members = await Member.find({gym:req.gym._id});
       const totalMember=members.length;
       const limitedMembers=await Member.find({gym:req.gym._id}).sort({createdAt: -1 }).skip(skip).limit(limit);

       res.status(200).json({
        message:members.length?"Fetched Members Successfully":"No any Member Registered yet",
        members:limitedMembers,
        totalMembers:totalMember
       })
       


    }catch(err){
    console.log(err);
    res.status(500).json({
        error:"Server Error"
    });
}
}

function addMonthsToDate(months,joiningDate){
    let today = joiningDate;
    const currentYear=today.getFullYear();
    const currentMonth=today.getMonth();
    const currentDay=today.getDate();


    const futureMonth=currentMonth+months;
    const futureYear=currentYear+Math.floor(futureMonth / 12);

    const adjustedMonth= futureMonth % 12;

    const futureDate= new Date(futureYear, adjustedMonth,1) 
   

    const lastDayOfFutureMonth= new Date(futureYear,adjustedMonth + 1,0).getDate();

    const adjustedDay= Math.min(currentDay ,lastDayOfFutureMonth);

    futureDate.setDate(adjustedDay);

    return futureDate;
   
}





exports.registerMember=async(req , res)=>{
    try{
        const{name,mobileNo,address,membership,profilePic,joiningDate} = req.body;


        const member=await Member.findOne({gym:req.gym._id,mobileNo});
        if(member){
            return res.status(409).json({error:"Already registered with this Mobile No"});
        }

        const memberShip=await Membership.findOne({_id:membership,gym:req.gym._id});


const membershipMonth=memberShip.months;
if(memberShip){
    let jngDate= new Date(joiningDate);
    const nextBillDate=addMonthsToDate(membershipMonth,jngDate);
    let newmember= new Member({name,mobileNo,address,membership,gym:req.gym._id,profilePic,nextBillDate});

    await newmember.save();
    res.status(200).json({message:"Member Registered Successfully",newmember}); 


}else{
    res.status(409).json({error: "No such Membership are there"});
}


    }catch(err){
    console.log(err);
    res.status(500).json({
        error:"Server Error"
    });
}

}


exports.searchedMember = async(req , res)=>{
    try{

        const  {searchTerm} =req.query;

        const member= await Member.find({gym:req.gym._id,$or:[{name:{$regex :'^' + searchTerm, $options:'i'}},
            {mobileNo:{$regex :'^' + searchTerm, $options:'i'}}

        ]
    });

        res.status(200).json({
            message:member.length?"Fetched Members Successfully":"No Such Member Registered yet",
            members:member,
            totalMembers:member.length

        })

    }catch(err){
    console.log(err);
    res.status(500).json({
        error:"Server Error"
    });
}

}

exports.monthlyMember = async(req,res)=>{
    try{

        const now=new Date();

        const startOfMonth= new Date(now.getFullYear(),now.getMonth(),1);

        const endOfMonth = new Date(now.getFullYear(),now.getMonth()+1,0,23,59,59,999);

        const member = await Member.find({gym:req.gym._id,})



    }catch(err){
    console.log(err);
    res.status(500).json({
        error:"Server Error"
    });
}

}

