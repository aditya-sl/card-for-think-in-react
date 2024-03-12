import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addToCart = (product) => {
		setCart([...cart, product]);
	};

	const removeFromCart = (productId) => {
		const index = cart.findIndex((item) => item.id === productId);
		if (index !== -1) {
			const updatedCart = [...cart];
			updatedCart.splice(index, 1); // Remove one item at index
			setCart(updatedCart);
		}
	};

	const getTotalItems = () => {
		return cart.length;
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, getTotalItems, removeFromCart }}
		>
			{children}
		</CartContext.Provider>
	);
};
