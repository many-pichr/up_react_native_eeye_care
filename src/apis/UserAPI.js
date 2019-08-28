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
    getDoctor: (auth) =>{
        console.log("auth==>",auth)
        const config = {
            headers: {
                Authorization: "Bearer "+auth
            }
        }
        const URL = `/api/user/get-doctor`;
        return ApiRequest.withoutAuth.get(URL, config);
    },
    getAppointment: (auth) =>{
        console.log("auth==>",auth)
        const config = {
            headers: {
                Authorization: "Bearer "+auth
            }
        }
        const URL = `/api/appointment/get`;
        return ApiRequest.withoutAuth.get(URL, config);
    },
    getAllUser: (auth) =>{
        console.log("auth==>",auth)
        const config = {
            headers: {
                Authorization: "Bearer "+auth
            }
        }
        const URL = `/api/user/get-all`;
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
            "role": d.role
        }
        console.log("body========",body)
        const URL = `/api/auth/signup`;
        return ApiRequest.withoutAuth.post(URL,body, config);
    },
    UpdateUser: (d,img,auth) => {
        const config = {
            headers: {
                Authorization: "Bearer "+auth,
                'content-type': 'application/json'
            }
        }
        const body =
            {
                "id": 0,
                "name": d.fullname,
                "gender": d.gender,
                "image": img,
                "dob": d.dob,
                "phone": d.phone,
                "address": d.address,
                "username": d.username,
                "email": d.email,
                "password": d.password,
                "role":d.role
            }
        console.log("body========",JSON.stringify(body))
        const URL = `/api/user/update/${d.id}`;
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
    CreateAppointment: (d,auth) => {
        const config = {
            headers: {
                Authorization: "Bearer "+auth,
                'content-type': 'application/json'
            }
        }
        const body =
                 {"id": 0,
                "doctor_id": d.doctorid,
                "user_id": d.userid,
                "title": d.title,
                     "description": d.description,
                     "image": d.image,
                "create_date": d.create,
                "deadline": d.deadline}
        const URL = `/api/appointment/create`;
        return ApiRequest.withoutAuth.post(URL,body, config);
    },
    UpdateAppointment: (d,auth) => {
        const config = {
            headers: {
                Authorization: "Bearer "+auth,
                'content-type': 'application/json'
            }
        }
        const body =
            {"id": d.id,
                "doctor_id": d.doctorid,
                "user_id": d.userid,
                "title": d.title,
                "image": d.image,
                "description": d.description,
                "create_date": d.create,
                "deadline": d.deadline}
        const URL = `/api/appointment/update`;
        return ApiRequest.withoutAuth.post(URL,body, config);
    },
    DeleteAppointment: (id,auth) => {
        const config = {
            headers: {
                Authorization: "Bearer "+auth,
                'content-type': 'application/json'
            }
        }
        const URL = `/api/appointment/delete/${id}`;
        return ApiRequest.withoutAuth.delete(URL, config);
    },
    ChangeStatus: (status,id,auth) => {
        const config = {
            headers: {
                Authorization: "Bearer "+auth,
                'content-type': 'application/json'
            }
        }
        const URL = `/api/appointment/change-status/${id}/${status}`;
        return ApiRequest.withoutAuth.get(URL, config);
    },
}