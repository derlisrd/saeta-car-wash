import { env } from "../App/config"
import axios from 'axios';

const API_URL = env.API_URL

export const APICALLER = {

    insert : async({table,data,token})=>{
        try {
            let res = await axios({
                url: `${env.API_URL}${table}`,
                method: "POST",
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json','Accept': 'application/json','Authorization': `Bearer ${token}`  },
              });
              return await res.data;
            
        } catch (e) {
            let error = {
                'response':false,
                'error':true,
                'message': e.message
            }
            return error 
        }
    },
    get : async({table,token})=>{
        try {
            let res = await axios({
                url: `${env.API_URL}${table}`,
                headers: { 'Content-Type': 'application/json','Accept': 'application/json',
                'Authorization': `Bearer ${token}`  
                },
              });
              return await res.data;
            
        } catch (e) {
            let error = {
                'response':false,
                'error':true,
                'message': e.message
            }
            return error 
        }
    },

    login: async(datas)=>{

        try {
            let res = await axios({
                url: `${env.API_URL}auth/login`,
                method: "POST",
                data: JSON.stringify(datas),
                headers: { 'Content-Type': 'application/json','Accept': 'application/json'  },
              });
              return await res.data;
            
        } catch (e) {
            let error = {
                'response':false,
                'error':true,
                'message': e.message
            }
            return error 
        }  
    },
    logout: async(token)=>{
        try {
            let res = await axios({
                url: `${env.API_URL}auth/logout`,
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json','Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
              });
              return await res.data;
            
        } catch (e) {
            let error = {
                'response':false,
                'error':true,
                'message': e.message
            }
            return error 
        }
    },
    checktoken: async(token)=>{
        try {
            let res = await axios({
                url: `${env.API_URL}auth/check`,
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json','Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
              });
              return await res.data;
            
        } catch (e) {
            let error = {
                'response':false,
                'error':true,
                'message': e.message
            }
            return error 
        }
    }
}