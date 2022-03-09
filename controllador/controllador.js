//archivo js que donde se importa o invoca la url del api el servicio y se hace una peticion  a travez de promesas
import { url } from "../api/url.js";
import { getData } from "./servicio.js";
export const getPaises = async() => {
    let obj = await getData(url);
    return obj
}