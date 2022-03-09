export const getData = async url => {
    const data = await fetch(url);
    const objetos = await data.json(data);
    return objetos;
}