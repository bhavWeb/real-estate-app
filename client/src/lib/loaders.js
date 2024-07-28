import { defer } from "react-router-dom";
import apiRequest from "../../../api/lib/apiRequest"

// export const singlePageLoader =async (request,params) =>{

//     const res = await apiRequest("/posts/" + params.id)

//     return res.data;
// }

export const singlePageLoader = async ({ request, params }) => {
    const res = await apiRequest("/post/" + (params.id) );
    return res.data;
  };

export const listPageLoader = async ({request,params}) =>{
    
    const query = request.url.split("?")[1]
    const postPromise = apiRequest("/post?" + query)
    return defer({
        postResponse : postPromise,
    });
}