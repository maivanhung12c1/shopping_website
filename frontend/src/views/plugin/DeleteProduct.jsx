import Swal from "sweetalert2";
import apiInstance from "../../utils/axios";

export const DeleteProduct = async (vendorId, productPid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: 'Xóa sản phẩm',
                text: 'Bạn có chắc muốn xóa sản phẩm này',
                confirmButtonText: 'Có, tôi chắc',
                showCancelButton: true,
            });

            if (result.isConfirmed) {
                // Make an asynchronous request to delete the product using apiInstance
                await apiInstance.delete(`vendor-product-delete/${vendorId}/${productPid}/`);
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Sản phẩm đã được xóa thành công'
                });
                resolve();
            } else if (result.isDenied) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Có lỗi xảy ra trong quá trình xóa sản phẩm, vui lòng thử lại',
                });
                reject(new Error('Đã hủy xóa sản phẩm'))
            }
        } catch (error) {
            reject(error);
        }
    })
}