const createErrorDataSync = async () => ({
    err: false,
    message: '',
    statusCode: 500,
});

const createErrorDataNotSync = () => ({
    err: false,
    message: '',
    statusCode: 500,
});
const createErrorData = {
    createErrorDataNotSync,
    createErrorDataSync,
};

export default createErrorData;
