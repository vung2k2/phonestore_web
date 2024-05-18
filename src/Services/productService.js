const ProductService = {
    getProducts: async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/public/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },
};

export default ProductService;
