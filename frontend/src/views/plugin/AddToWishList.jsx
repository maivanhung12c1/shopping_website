import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";

export const AddToWishList = async (productId, userId) => {
    try {
        const formData = new FormData();
        formData.append('product_id', productId);
        formData.append('user_id', userId);

        const response = await apiInstance.post('customer/wishlist/create/', formData);
        Swal.fire({
            icon: 'success',
            title: response.data.message,
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
        })
    }
}