import { React, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaShoppingCart, FaSpinner } from 'react-icons/fa';

import apiInstance from '../../utils/axios';
import Addon from '../plugin/Addon';
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import CartID from '../plugin/cartID';
import { AddToCart } from '../plugin/addToCart';
import { AddToWishList } from '../plugin/addToWishList';
import { CartContext } from '../plugin/Context';



function Products() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);

    let [isAddingToCart, setIsAddingToCart] = useState("Thêm vào giỏ hàng");
    const [loadingStates, setLoadingStates] = useState({});
    let [loading, setLoading] = useState(true);

    const addon = Addon();
    const currentAddress = GetCurrentAddress();
    const userData = UserData();
    let cart_id = CartID();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [colorImage, setColorImage] = useState("");
    const [colorValue, setColorValue] = useState('No Color');
    const [sizeValue, setSizeValue] = useState('No Size');
    const [qtyValue, setQtyValue] = useState(1);
    let [cartCount, setCartCount] = useContext(CartContext);

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);

    async function fetchData(endpoint, setDataFunction) {
        try {
            const response = await apiInstance.get(endpoint);
            setDataFunction(response.data);
            if (products) {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData('products/', setProducts);
    }, []);

    useEffect(() => {
        fetchData('featured-products/', setFeaturedProducts);
    }, []);

    useEffect(() => {
        fetchData('category/', setCategory);
    }, []);

    useEffect(() => {
        fetchData('brand/', setBrand);
    }, []);


    const handleColorButtonClick = (event, product_id, colorName, colorImage) => {
        setColorValue(colorValue);
        setColorImage(colorImage);
        setSelectedProduct(product_id);

        setSelectedColors((prevSelectedColors) => ({
            ...prevSelectedColors,
            [product_id]: colorName,
        }));
    };

    const handleSizeButtonClick = (event, product_id, sizeName) => {
        setSizeValue(sizeName);
        setSelectedProduct(product_id);

        setSelectedSize((prevSelectedSize) => ({
            ...prevSelectedSize,
            [product_id]: sizeName,
        }));
    };

    const handleQtyChange = (event, product_id) => {
        setQtyValue(event.target.value);
        setSelectedProduct(product_id);
    };

    const handleAddToCart = async (product_id, price, shipping_amount) => {
        setLoadingStates((prevStates) => ({
            ...prevStates,
            [product_id]: 'Đang thêm ...',
        }));

        try {
            await addToCart(product_id, userData?.user_id, qtyValue, price, shipping_amount, currentAddress.country, colorValue, sizeValue, cart_id, setIsAddingToCart);
            
            // After a successfull operation, set the loading state to false
            setLoadingStates((prevStates) => ({
                ...prevStates,
                [product_id]: 'Đã thêm vào giỏ hàng'
            }));

            setColorValue("No Color");
            setSizeValue("No Size");
            setQtyValue(0);

            const url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
            const response = await apiInstance.get(url);

            setCartCount(response.data.length);
            console.log(response.data.length);

        } catch (error) {
            console.log(error);
            setLoadingStates((prevStates) => ({
                ...prevStates,
                [product_id]: 'Thêm vào giỏ hàng',
            }));
        }
    };

    const handleAddToWishList = async (product_id) => {
        try {
            await AddToWishList(product_id, userData?.user_id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {loading === false && 
                <div>
                    <main className='mt-5'>
                        <div className='container'>
                            <section className='text-center container'>
                                <div className='row mt-4 mb-3'>
                                    <div className='col-lg-6 col-md-8 mx-auto'>
                                        <h1 className='fw-light'>Thể loại hot</h1>
                                        <p className='lead text-muted'>
                                            Thể loại
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <div className='d-flex justify-content-center'>
                                {category.map((c, index) => {
                                    <div className='align-items-center d-flex flex-column' style={{ background: '#e8e8e8', marginLeft: '10px', borderRadius: '10px', padding: '30px' }}>
                                        <img src={c.image}
                                            alt=''
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                                        />
                                        <p><a href='' className='text-dark'>{c.title}</a></p>
                                    </div>
                                })}
                            </div>
                            <section className='text-center container'>
                                <div className='row mt-4 mb-3'>
                                    <div className='col-lg-6 col-md-8 mx-auto'>
                                        <h1 className='fw-light'>
                                            Nổi bật
                                       </h1>
                                       <p className='lead text-muted'>
                                            Sản phẩm nổi bật
                                       </p>
                                    </div>
                                </div>
                            </section>
                            <section className='text-center'>
                                <div className='row'>
                                    {currentItems.map((product, index) => (
                                        <div className='col-lg-4 col-md-12 mb-4' key={index.id}>
                                            <div className='card'>
                                                <div
                                                    className='bg-image hover-zoom ripple'
                                                    data-mdb-ripple-color='light'
                                                >
                                                    <Link to={`/detail/${product.slug}`}>
                                                        <img
                                                            src={(selectedProduct === product.id &&colorImage) ? colorImage : product.image}
                                                            className='w-100'
                                                            style={{ width: '100px', height: '300px', objectFit: 'cover'}}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className='card-body'>
                                                    <h6 className=''>By: <Link to={`/vendor/${product?.vendor?.slug}`}>{product.vendor.name}</Link></h6>
                                                    <Link to={`/detail/${product.slug}`} className='text-reset'><h5 className='card-title mb-3'>{product.title.slice(0, 30)}...</h5></Link>
                                                    <Link to={`/`} className='text-reset'><p>{product?.brand.title}</p></Link>
                                                    <h6 className='mb-1'>${product.price}</h6>
                                                    {((product.color && product.color.length > 0) || (product.size && product.size.length > 0)) ? (
                                                        <div className='btn-group'>
                                                            <button className='btn btn-primary dropdown-toggle' type='button' id='dropdownMenuClickable' data-bs-toggle='dropdown' data-bs-auto-close='false' aria-expanded='false'>
                                                                Variation
                                                            </button>
                                                            <ul className='dropdown-menu' style={{ maxWidth: '400px' }} aria-labelledby='dropdownMenuClickable'>
                                                                {/* Qauntity */}
                                                                <div className='d-flex flex-column mb-2 mt-2 p-1'>
                                                                    <div className='p-1 mt-0 pt-0 d-flex flex-wrap'>
                                                                        <>
                                                                            <li>
                                                                                <input
                                                                                    type='number'
                                                                                    className='form-control'
                                                                                    placeholder='Số lượng'
                                                                                    onChange={(e) => handleQtyChange(e, product_id)}
                                                                                    min={1}
                                                                                    defaultValue={1}
                                                                                />
                                                                            </li>
                                                                        </>

                                                                    </div>

                                                                </div>
                                                                {/* Size */}
                                                                {product?.size && product?.size.length > 0 && (
                                                                    <div className='d-flex flex-column'>
                                                                        <li className='p-1'><b>Size</b>: {selectedSize[product_id] || 'Chọn Size'}

                                                                        </li>
                                                                        <div className='p-1 mt-0 pt-0 d-flex flex-wrap'>
                                                                            {product?.size.map((size, index) => (
                                                                                <>
                                                                                    <li key={index}>
                                                                                        <button
                                                                                            className='btn btn-secondary btn-sm me-2 mb-1'
                                                                                            onClick={(e) => handleSizeButtonClick(e, product.id, size.name)}
                                                                                        >
                                                                                            {size.name}
                                                                                        </button>

                                                                                    </li>
                                                                                </>
                                                                            ))}

                                                                        </div>

                                                                    </div>
                                                                )}

                                                                {/* Corlor */}
                                                                {product.color && product.color.length > 0 && (
                                                                    <div className='d-flex flex-column mt-3'>
                                                                        <li className='p-1 color_name_div'><b>Màu sắc</b>: {selectedColors[product.id] || 'Chọn màu sắc'}</li>
                                                                        <div className='p-1 mt-0 pt-0 d-flex flex-wrap'>
                                                                            {product?.color?.map((color, index) => (
                                                                                <>
                                                                                    <input type='hidden' className={`color_name${color.id}`} name='' id=''/>
                                                                                    <li key={index}>
                                                                                        <button
                                                                                            key={color.id}
                                                                                            className='color-button btn p-3 me-2'
                                                                                            style={{ backgroundColor: color.color_code }}
                                                                                            onClick={(e) => handleColorButtonClick(e, product.id, color.name, cololr.image)}
                                                                                        >
                                                                                        </button>
                                                                                    </li>
                                                                                </>
                                                                            ))}
                                                                        </div>

                                                                    </div>
                                                                )}

                                                                {/* Add To Cart */}
                                                                <div className='d-flex mt-3 p-1 w-100'>
                                                                    <button
                                                                        onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                                                                        disabled={loadingStates[product.id] === 'Đang thêm vào giỏ hàng ...'}
                                                                        type='button'
                                                                        className='btn btn-primary me-1 mb-1'
                                                                    >
                                                                        {loadingStates[product.id] === 'Đã thêm vào giỏ hàng'} ? (
                                                                            <>
                                                                                Đã thêm vào giỏ hàng <FaCheckCircle />
                                                                            </>
                                                                        ) : loadingStates[product.id] === 'Đang thêm vào giỏ hàng ...' ? (
                                                                            <>
                                                                                Đang thêm vào giỏ hàng <FaSpinner className='fas fa-spin'/>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {loadingStates[product.id] || 'Thêm vào giỏ hàng'} <FaShoppingCart />
                                                                            </>
                                                                        )

                                                                    </button>

                                                                </div>

                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                                                            disabled={loadingStates[product.id] === 'Đang thêm vào giỏ hàng ...'}
                                                            type='button'
                                                            className='btn btn-primary me-1 mb-1'
                                                        >
                                                            {loadingStates[product.id] === 'Đã thêm vào giỏ hàng'} ? (
                                                                <>
                                                                    Đã thêm vào giỏ hàng <FaCheckCircle />
                                                                </>
                                                            ) : loadingStates[product.id] === 'Đang thêm vào giỏ hàng ...' ? (
                                                                <>
                                                                    Đang thêm vào giỏ hàng <FaSpinner className='fas fa-spin'/>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {loadingStates[product.id] || 'Thêm vào giỏ hàng'} <FaShoppingCart />
                                                                </>
                                                            )
                                                        </button>
                                                    )}

                                                    {/* Wishlish Button */}
                                                    <button
                                                        onClick={() => handleAddToWishList(product.id)}
                                                        type='button'
                                                        className='btn btn-danger px-3 ms-2'
                                                    >
                                                        <i className='fas fa-heart' />

                                                    </button>

                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            }
        </>
    )


};
