const getJson = async () => {
    try {
        const response = await axios.get('http://localhost:3000/json?a=1&b=2');
        const items = response.data;
        return items;
    } catch (errors) {
        console.error(errors);
    }
};
const onButtonClick = async () => {
    var d = await getJson()
    console.log(d)
}