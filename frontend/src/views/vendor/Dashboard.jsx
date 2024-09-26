import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import Sidebar from "./Sidebar";


function Dashboard() {
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState(null);
    const [orderChartData, setOrderChartData] = useState(null);
    const [productsChartData, setProductsChartData] = useState(null);

    const axios = apiInstance;
    const userData = UserData();
    const navigate = useNavigate();

    if (userData?.vendor_id === 0) {
        window.location.href = 'vendor/register/'
    }

    if (userData?.vendor_id !== 0) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`vendor/stats/${userData?.vendor_id}/`);
                    setStats(response.data[0]);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();

        }, []);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`vendor/products/${userData?.vendor_id}/`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

            fetchData();

        }, []);
    }
    


    return (
        <div>Dashboard</div>
    )
}

export default Dashboard