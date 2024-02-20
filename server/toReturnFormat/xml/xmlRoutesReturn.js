// Форматы возвращаемых обьектов
const title = () => ({
    ru: null,
    ua: null,   
});
const description = () => ({
    ru: null,
    ua: null,
});
const text = () => ({
    ru: null,
    ua: null,
});
const foto = () => ([]);
const price = () => ({
    value: null,
    currency: 'USD',
});
const category = () => ({
    id: null,
    ru: null,
    ua: null,
});
const categoryXML = () => ({
    id: null,
    ru: null,
    ua: null,
    rz: null,
});

const param = () => ([{
    name: null,
    valueUK: null,
    valueRU: null,
},]);

const productInfo = () => ({
    kod: null,
    id: null,
    ostatok: null,
    category: category(),
    price: price(),
    title: title(),
    description: description(),
    // text: text(),
    foto: foto(),
});

const productInXML = () => ({
    kod: null,
    id: null,
    url: null,
    vendor: null,
    param: param(),
    available: false,
    quantity_in_stock: null,
    category: categoryXML(),
    price: price(),
    title: title(),
    description: description(),
    // text: text(),
    foto: foto(),
});

const xmlRozetka = () => ({
    productInfo: productInfo(),
    productInXML: productInXML(),
});

const xmlCatRozetka = () => ({
    id: null,
    ua: null,
    desc: null,
});

const toReturnXML = {
    dataFormt: {
        productInfo: productInfo(),
        productInXML: productInXML(),
        xmlCatRozetka: xmlCatRozetka(),
    },

    rout: {
        xmlRozetka: xmlRozetka,
        xmlCatRozetka: xmlCatRozetka,
    }
};

export default toReturnXML;