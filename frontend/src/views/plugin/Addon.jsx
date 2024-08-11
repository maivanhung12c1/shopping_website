import { React, useEffect, useState} from 'react'
import apiInstance from '../../utils/axios'

function Addon() {
    const [addon, setAddon] = useState([]);

    async function fetchData(endpoint, setDataFunction) {
        try {
            const response = await apiInstance.get(endpoint);
            setDataFunction(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData('addon/', setAddon);
    }, []);

    return addon;
}

export default Addon