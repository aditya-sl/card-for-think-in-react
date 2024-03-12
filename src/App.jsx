import EcommerceCard from './components/Card';
import { CartProvider } from './contexts/card-context';

const App = () => {
	return (
		<CartProvider>
			<div className="App">
				<h1>E-commerce Card</h1>
				<EcommerceCard />
			</div>
		</CartProvider>
	);
};

export default App;
