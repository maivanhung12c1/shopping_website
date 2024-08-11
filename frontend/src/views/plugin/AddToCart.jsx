import React from 'react'
import apiInstance from '../../utils/axios'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

// Function to add product to the cart
export const AddToCart = async (product_id, user_id, qty, price, shipping_amount, current_address, color, size, cart_id, setIsAddingToCart) => {
    try {
        const formData = new FormData();
        formData.append('product', product_id);
        formData.append('user', user_id);
        formData.append('qty', qty);
        formData.append('price', price);
        formData.append('shipping_amount', shipping_amount);
        formData.append('country', country);
        formData.append('size', size);
        formData.append('color', color);
        formData.append('cart_id', cart_id);

        const response = await apiInstance.post('cart-view/', formData);

        Toast.fire({
            icon: 'success',
            title: 'Added To Cart',
        });
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Added To Cart',
        });
    }
}