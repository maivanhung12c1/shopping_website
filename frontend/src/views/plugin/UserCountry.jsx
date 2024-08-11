import { useEffect, useState } from "react";

function GetCurrentAddress() {
    const [add, setAdd] = useState('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longtitude } = pos.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longtitude}`;
            fetch(url)
            .then(res => res.json())
            .then(data => setAdd(data.address))
        });
    }, []);
    return add;
}

export default GetCurrentAddress;