// Handle promise output

const handleRes = async (...args) => {
    const res = await fetch(...args);
    const data = await res.json();
    Object.freeze(data);
    return {
        res,
        data: data.data,
    };
};

export default handleRes;
