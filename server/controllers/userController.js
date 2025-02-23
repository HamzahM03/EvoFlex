import userModel from "../models/userModel";

export const getUserData = async (req,res)=>{
  try {
    const {userId} = req.use.userId;
    const user = await userModel.findById(userId);

    if(!user){
      return res.json({message: false, message: "User not found"});
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,

      }
    });


  } catch (error) {
    return res.json({success: false, message: error.message});
  }
}