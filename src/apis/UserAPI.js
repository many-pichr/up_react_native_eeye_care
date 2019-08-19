import ApiRequest from "../commons/utils/ApiRequest";

export default {

    getPatient: (auth) =>{
        console.log("auth==>",auth)
        const config = {
            headers: {
                Authorization: "Bearer "+auth
            }
        }
        const URL = `/api/user/get-patient`;
        return ApiRequest.withoutAuth.get(URL, config);
    },
    getUserInfo: (auth) =>{
        console.log("auth==>",auth)
        const config = {
            headers: {
                Authorization: "Bearer "+auth
            }
        }
        const URL = `/api/user/get-user-info`;
        return ApiRequest.withoutAuth.get(URL, config);
    },
    deleteUser: (auth,id) =>{
        console.log(id,"auth==>",auth)
        const config = {
            headers: {
                Authorization: "Bearer "+auth
            }
        }
        const URL = `/api/user/delete/${id}`;
        return ApiRequest.withoutAuth.delete(URL, config);
    },
    CreateUser: (d,img) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const body = 
        {
            "id": 1,
            "name": d.fullname,
            "gender": d.gender,
            "image": img,
            "dob": d.dob,
            "phone": d.phone,
            "address": d.address,
            "username": d.username,
            "email": d.email,
            "password": d.password,
            "role":["user"]
        }
        console.log("body========",body)
        const URL = `/api/auth/signup`;
        return ApiRequest.withoutAuth.post(URL,body, config);
    },
    SignIn: (data) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const body = 
        {
            "username": data.username,
            "password": data.password,
        }
        const URL = `/api/auth/signin`;
        return ApiRequest.withoutAuth.post(URL,body, config);
    },
}