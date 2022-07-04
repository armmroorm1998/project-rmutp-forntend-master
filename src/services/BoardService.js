import { mainAPIOptions, mainAPIHeaderOptions, mainAPIHeaderUpload } from "../constant/config";
import { BaseService } from "./BaseService";

export class BoardService extends BaseService {
    fetchSignin = ({ email, password }) => {
        return this.requester.post('/SignIn', { email, password }, mainAPIOptions())
    }
    fetchForgetPassword = ({ email }) => {
        return this.requester.post('/ForgetPassword/SendOTP', { email }, mainAPIOptions())
    }
    
    fetchResetPassword = ({ email, newPassword, OTP }) => {
        return this.requester.post('/ForgetPassword/ResetPassword', { email, newPassword, OTP }, mainAPIOptions())
    }

    fetchSignup = ({ email, signinMethod, avatar, password, genderID, titleID, firstname, lastname }) => {
        return this.requester.post('/SignUp', { email, signinMethod, avatar, password, genderID, titleID, firstname, lastname }, mainAPIHeaderOptions())
    }

    fetchSignout = ({ token }) => {
        return this.requester.post('/SignOut', { token }, mainAPIHeaderOptions())
    }

    fetchProfile = () => {
        return this.requester.get('/Profile', mainAPIHeaderOptions())
    }

    fetchUpdateProfile = ({ Userdata, changePassword }) => {
        return this.requester.post('/Profile/EditProfile', { Userdata, changePassword }, mainAPIHeaderOptions())
    }

    fetchUploadAvatar = (formData) => {
        return this.requester.post('/Profile/UploadAvatar',formData, mainAPIHeaderUpload())
    }
    
    fetchPostApiUpdate = (formData) => {
        return this.requester.post('/CMS/Upload', formData, mainAPIHeaderUpload())
    }
}