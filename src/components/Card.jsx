// EcommerceCard.js

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/card-context';
import './Card.css';

const EcommerceCard = () => {
	const { cart, addToCart, getTotalItems, removeFromCart } =
		useContext(CartContext);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [error, setError] = useState(null);

	// Function to filter products by category
	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	// Function to add product to cart
	const handleAddToCart = (product) => {
		addToCart(product);
	};

	const handleRemoveFromCart = (productId) => {
		removeFromCart(productId);
	};

	// Check if product is in cart
	const isInCart = (productId) => {
		return cart.some((item) => item.id === productId);
	};

	// Render product cards
	const renderProducts = () => {
		if (error) {
			return <p>{error}</p>;
		}

		return (
			<div className="product-list">
				{products.map((product) => (
					<div key={product.id} className="product-card">
						<img
							src={product.image}
							alt={product.title}
							className="product-image"
						/>
						<h3 className="product-title">{product.title}</h3>
						<p className="product-price">${product.price}</p>
						<button
							onClick={() => handleAddToCart(product)}
							className="add-to-cart-button"
						>
							Add to Cart
						</button>
						{isInCart(product.id) && (
							<button
								onClick={() => handleRemoveFromCart(product.id)}
								className="remove-from-cart-button"
							>
								Remove from Cart
							</button>
						)}
					</div>
				))}
			</div>
		);
	};

	// Initial fetch of products and categories
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					selectedCategory
						? `https://fakestoreapi.com/products/category/${selectedCategory}`
						: 'https://fakestoreapi.com/products'
				);
				setProducts(response.data);
			} catch (error) {
				setError('Error fetching products');
			}
		};

		// Fetch product categories
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					'https://fakestoreapi.com/products/categories'
				);
				setCategories(response.data);
			} catch (error) {
				setError('Error fetching categories');
			}
		};

		fetchProducts();
		fetchCategories();
	}, [selectedCategory]);

	return (
		<div className="ecommerce-card">
			<h2 className="card-title">Featured Products</h2>
			<div className="cart-info">
				<p>Items in Cart: {getTotalItems()}</p>
			</div>
			<div className="categories">
				<button
					className="category-button"
					onClick={() => handleCategoryChange('')}
				>
					All
				</button>
				{categories.map((category) => (
					<button
						key={category}
						className="category-button"
						onClick={() => handleCategoryChange(category)}
					>
						{category}
					</button>
				))}
			</div>
			{renderProducts()}
		</div>
	);
};

export default EcommerceCard;
