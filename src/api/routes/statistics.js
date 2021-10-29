import httpClient from "../httpClient";

const END_POINT = "/statistics";


const getSoldProductsForPeriod = (queryString) => httpClient.get(`${END_POINT}/products-sold`, {
    params: {
        startDate: queryString.startDate,
        endDate: queryString.endDate
    }
});

const getCatgoriesAmountForPeriod = (queryString) => httpClient.get(`${END_POINT}/categories-for-period`, {
    params: {
        startDate: queryString.startDate,
        endDate: queryString.endDate
    }
});

const getTotalRevenueForPeriod = (queryString) => httpClient.get(`${END_POINT}/total-revenue`, {
    params: {
        startDate: queryString.startDate,
        endDate: queryString.endDate
    }
});

const getRevenueForWholeMonth = (queryString) => httpClient.get(`${END_POINT}/revenue-per-month`, {
    params: {
        allDaysForMonth: queryString.days,
        daysInMonth: queryString.daysInMonth
    }
});

const getRevenueProductForWholeMonth = (id, queryString) => httpClient.get(`${END_POINT}/revenue-product-per-month/${id}`, {
    params: {
        allDaysForMonth: queryString.days,
        daysInMonth: queryString.daysInMonth
    }
});

const getRevenueCategoryForWholeMonth = (id, queryString) => httpClient.get(`${END_POINT}/revenue-category-per-month/${id}`, {
    params: {
        allDaysForMonth: queryString.days,
        daysInMonth: queryString.daysInMonth
    }
});

const getReportForPeriod = (queryString) => httpClient.get(`${END_POINT}/report`, {
    params: {
        startDate: queryString.startDate,
        endDate: queryString.endDate
    }
});


export { getSoldProductsForPeriod, getCatgoriesAmountForPeriod, getTotalRevenueForPeriod, getRevenueForWholeMonth, getRevenueProductForWholeMonth, getRevenueCategoryForWholeMonth, getReportForPeriod };
