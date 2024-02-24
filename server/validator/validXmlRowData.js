const validFormData = async (formData) => {
    if (!formData.categoryName || formData.categoryName === '') {
        return { err: true, msg: 'categoryName is empty' };
    }
    if (!formData.productCatId || formData.productCatId === '') {
        return { err: true, msg: 'productCatId is empty' };
    }
    if (!formData.productId || formData.productId === '') {
        return { err: true, msg: 'productId is empty' };
    }
    if (!formData.productKod || formData.productKod === '') {
        return { err: true, msg: 'productKod is empty' };
    }
    if (!formData.productVendor || formData.productVendor === '') {
        return { err: true, msg: 'productVendor is empty' };
    }
    if (!formData.productNameRU || formData.productNameRU === '') {
        return { err: true, msg: 'productNameRU is empty' };
    }
    if (!formData.productNameUA || formData.productNameUA === '') {
        return { err: true, msg: 'productNameUA is empty' };
    }
    if (!formData.productDescRU || formData.productDescRU === '') {
        return { err: true, msg: 'productDescRU is empty' };
    }
    if (!formData.productDescUA || formData.productDescUA === '') {
        return { err: true, msg: 'productDescUA is empty' };
    }
    if (!formData.params || formData.params.length === 0) {
        return { err: true, msg: 'params is empty' };
    }
    if (!formData.selectedPhotos || formData.selectedPhotos.length === 0) {
        return { err: true, msg: 'selectedPhotos is empty' };
    }
    if (!formData.priceUsd || formData.priceUsd === 0) {
        return { err: true, msg: 'params is empty' };
    }

    return { err: false };
};

export default validFormData;