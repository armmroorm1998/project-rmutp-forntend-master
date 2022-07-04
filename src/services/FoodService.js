import { mainAPIHeaderOptions, mainAPIHeaderUpload } from "../constant/config";
import { BaseService } from "./BaseService";

export class FoodService extends BaseService {  
  fetchGetCategoryMenu = ({ categoryId, userId, adminId }) => {
    return this.requester.post('/GetCategoryMenu', { categoryId , userId, adminId }, mainAPIHeaderOptions())
  }
  fetchGetDetailFood = ({ id , categoryId }) => {
    return this.requester.post('/GetDetailFood', { id, categoryId }, mainAPIHeaderOptions())
  }
  fetchGetDetailUpdateMenu = ({ menuId  }) => {
    return this.requester.post('/CMS/GetDetailUpdateMenu', { menuId }, mainAPIHeaderOptions())
  }
  fetchGetDetailDeleteMenu = ({ menuId  }) => {
    return this.requester.post('/CMS/DeleteMenu', { menuId }, mainAPIHeaderOptions())
  }
  fetchSetPoint = ({ id , userId, point }) => {
    return this.requester.post('/GetPointMenu', { id, userId, point }, mainAPIHeaderOptions())
  }
  fetchGetApiIngredients = () => {
    return this.requester.get('/CMS/GetIngredients', mainAPIHeaderOptions())
  }
  fetchGetTopMenu = ({token}) => {
    return this.requester.post('/GetTopMenu',{token}, mainAPIHeaderOptions())
  }
  fetchPostApiCMS = ({id,menuId,ingredients,menuName,methods,name,point,userId,adminId,categoryId,databases}) => {
    return this.requester.post('/CMS/CreateMenu',{id,menuId,ingredients,menuName,methods,name,point,userId,adminId,categoryId,databases}, mainAPIHeaderOptions())
  }
  fetchSearch = ({ingredients}) => {
    return this.requester.post('/Search',{ingredients}, mainAPIHeaderOptions())
  }
  fetchManegeMenu = ({userId,adminId}) => {
    return this.requester.post('/CMS/ManageMenu',{userId,adminId}, mainAPIHeaderOptions())
  }
  fetchPostApiCMSUpdate = (formData) => {
    return this.requester.post('/CMS/Upload', formData, mainAPIHeaderUpload())
  }
}