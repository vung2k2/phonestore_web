import React, { useState } from 'react';
import './CSS/MyOrder.css';
import OrderItem from '../Components/OrderItem/OrderItem';

const MyOrder = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Giả sử danh sách các đơn hàng được truyền vào component qua props orders
    const orders = [
        {
            id: 45,
            total_amount: '364.00',
            order_status: 'pending',
            order_date: '2024-04-13T17:00:00.000Z',
            order_details: [
                {
                    name: 'Điện thoại Xiaomi Redmi Note 13 Pro+ 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 1,
                },
            ],
        },
        {
            id: 45,
            total_amount: '364.00',
            order_status: 'delivered',
            order_date: '2024-04-13T17:00:00.000Z',
            order_details: [
                {
                    name: 'Điện thoại Xiaomi Redmi Note 13 Pro+ 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 1,
                },

                {
                    name: 'Galaxy A54 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 1,
                },
                {
                    name: 'Điện thoại Xiaomi Redmi Note 13 Pro+ 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 1,
                },

                {
                    name: 'Galaxy A54 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 1,
                },
                {
                    name: 'Điện thoại Xiaomi Redmi Note 13 Pro+ 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 1,
                },

                {
                    name: 'Galaxy A54 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 1,
                },
            ],
        },
        {
            id: 45,
            total_amount: '364.00',
            order_status: 'pending',
            order_date: '2024-04-13T17:00:00.000Z',
            order_details: [
                {
                    name: 'Galaxy A54 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 1,
                },
            ],
        },
        {
            id: 45,
            total_amount: '364.00',
            order_status: 'pending',
            order_date: '2024-04-13T17:00:00.000Z',
            order_details: [
                {
                    name: 'Galaxy A54 5G',
                    imageUrl:
                        'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg',
                    quantity: 5,
                },
            ],
        },
    ];

    const [showAll, setShowAll] = useState(false);
    const maxItemsToShow = 2;

    // Hàm lọc danh sách các đơn hàng theo category

    const filteredOrders =
        selectedCategory === 'all' ? orders : orders.filter((order) => order.order_status === selectedCategory);

    // Danh sách các category và trạng thái tương ứng
    const categories = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Chờ xác nhận', value: 'pending' },
        { label: 'Đã mua', value: 'delivered' },
        { label: 'Đã hủy', value: 'cancelled' },
    ];

    return (
        <div className="my-order">
            <div className="my-order-category">
                {/* Hiển thị danh sách các category */}
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={selectedCategory === category.value ? 'active' : ''}
                        onClick={() => setSelectedCategory(category.value)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
            <div className="my-order-main">
                {/* Hiển thị danh sách các đơn hàng */}
                {filteredOrders.map((order, index) => (
                    <OrderItem key={index} order={order} />
                ))}
            </div>
        </div>
    );
};

export default MyOrder;
