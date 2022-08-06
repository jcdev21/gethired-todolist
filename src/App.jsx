import React from 'react';
import { Box, Button, Container, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Item = React.lazy(() => import('./pages/Item'));

function App() {
	return (
		<Router>
			<Header title="TO DO LIST APP" />
			<Container maxW="5xl">
				<Routes>
					<Route
						path="/"
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Dashboard />
							</React.Suspense>
						}
					/>
					<Route
						path="/item-list/:id"
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Item />
							</React.Suspense>
						}
					/>
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
