// Handle promise output

const handleRes = async (promise, ...args) => {
    try {
        const res = await promise(...args);
        // TODO: Add proper error handler when anime is not found
        if (!res.ok) throw Error("No data available");
        const data = await res.json();
        return data.data;
    } catch (err) {
        return err;
    }
};

export default handleRes;
