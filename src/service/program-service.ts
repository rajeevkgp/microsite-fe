import { EDIT_CAROUSEL, UPLOAD_IMG } from "../constants/urls"
import httpInstance from "../utility/http-client"

export const getPrograms = (url: string) => {
    return httpInstance.get(url)
}

// export const addPrograms = (body: any) => {
//     const url = "/microsite/program/add-program"
//     return httpInstance.post(url,body);
// }

// export const uploadImage = (body: any) => {
//     return httpInstance.post(UPLOAD_IMG,body);
// }

export const editCarouselSlide = (body: any) => {
    return httpInstance.post(EDIT_CAROUSEL, body)
}