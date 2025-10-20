import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"
import sendEmail from "../../email/sendEmail.js"
import Buyer from "../../models/buyerModel.js"
import Seller from "../../models/sellerModel.js"


export const callRequest = async (req, res) => {
    try {
        const userId = req.userId
        const calleeId = req.params.calleeId

        const user = await Buyer.findById(userId) || await Seller.findById(userId);
        if (!user) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "User not found."
            });
        }

        const callee = await Seller.findById(calleeId) ||  await Buyer.findById(calleeId);
        if (!callee) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "User does not exist."
            });
        }

        if (callee._id.toString() === userId.toString()) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "You can't call yourself."
            });
        }

        // sendMail function 
        const callRequestContextData = {
            callerUsername: user.name,
            callerEmail: user.email,
            callerPhoneNum: user.phoneNumber,
            callerAddress: user.address ? user.address : "Address not given",

            calleeName: callee.name,
            calleeEmail: callee.email

        };
        const subject = `Dear ${callee.name},You have a call request from ${user.name}`

        try {
            await sendEmail(callee.email, "callRequestTemplate", callRequestContextData, subject)

        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                success: false,
                message: error.message
            })
        }


        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Call request send to user successfully",
            caller: user,
            callee: callee
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}