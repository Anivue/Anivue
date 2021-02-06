// Handle promise output

const handleRes = async (promise, ...args) => {
    const res = await promise(...args);
    const data = await res.json();
    return {
        res,
        data: data.data,
    };
};

export default handleRes;
