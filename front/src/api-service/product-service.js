// запросы на получение списка товаров с фильтрацией и без
// marketName - profitools / motoservice /
// filtr = {} 
const getProductList = async (marketName = 'profitools', filtr) => {
    try {
        filtr = {};
        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:3000/api/product/getAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ marketName, filtr }),
        });
        console.log('geet ALL - ', response);
        if (!response.ok) {
            return {error:true, msg:`HTTP error! status: ${response.status}`}
        }

        return await response.json(); 
    } catch (error) {
        return {error:true, msg:`Error during login: ${error}`}
    }
}

export {getProductList};