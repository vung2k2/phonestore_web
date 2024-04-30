import React, { useState, useContext, useEffect } from 'react';
import './CSS/MyOrder.css';
import OrderItem from '../Components/OrderItem/OrderItem';
import { ShopContext } from '../context/ShopContext';

const MyOrder = () => {
    const { orders, fetchOrders } = useContext(ShopContext);
    const [selectedCategory, setSelectedCategory] = useState('all');
    useEffect(() => {
        // Gọi hàm để lấy tất cả hóa đơn khi component được render lần đầu tiên
        fetchOrders();
    }, []);

    // Hàm lọc danh sách các đơn hàng theo category

    const filteredOrders =
        selectedCategory === 'all' ? orders : orders.filter((order) => order.status === selectedCategory);

    // Danh sách các category và trạng thái tương ứng

    const categories = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Chờ xác nhận', value: 'pending' },
        { label: 'Đã mua', value: 'completed' },
        { label: 'Đã hủy', value: 'cancelled' },
    ];

    const totalOrders = orders.length;

    const countOrdersByStatus = (status) => {
        return orders.filter((order) => order.status === status).length;
    };

    return (
        <div className="my-order">
            <div className="my-order-category">
                {/* Hiển thị danh sách các category */}
                {categories.map((category, index) => (
                    <div key={index}>
                        <button
                            key={index}
                            className={selectedCategory === category.value ? 'active' : ''}
                            onClick={() => setSelectedCategory(category.value)}
                        >
                            {category.label}
                            <span>
                                {category.value === 'all' ? `${totalOrders}` : `${countOrdersByStatus(category.value)}`}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
            <div className="my-order-main">
                {/* Hiển thị danh sách các đơn hàng */}
                {filteredOrders
                    .slice()
                    .reverse()
                    .map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))}
            </div>
        </div>
    );
};

export default MyOrder;
