function CartID() {
    // Function to generate a random string with the desired length
    const generateRandomString = () => {
        const length = 30;
        const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789'; // Characters to choose from
        let randomString = '';
        
        for (let i=0; i<length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);

        }
        localStorage.setItem('randomString', randomString);
    };
    const existingRandomString = localStorage.getItem('randomString');
    if (!existingRandomString) {
        generateRandomString();
    } else {

    }
    return existingRandomString;
}

export default CartID;