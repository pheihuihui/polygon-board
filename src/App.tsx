import { FC, useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { StockList } from './components/StockList';
import { StockDetails, Stock } from './components/StockDetails';
import { Settings } from './components/Settings';
import { initializePolygonClient } from './services/polygonClient';

export const App: FC = () => {
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

    // Initialize Polygon client on app launch
    useEffect(() => {
        initializePolygonClient();
    }, []);

    return (
        <Box h="100vh" position="relative" bg="gray.900" color="white">
            <Box position="absolute" top={4} right={4} zIndex={10}>
                <Settings />
            </Box>
            <Flex h="100vh">
                <StockList onSelectStock={setSelectedStock} selectedStock={selectedStock} />
                <StockDetails stock={selectedStock} />
            </Flex>
        </Box>
    );
};
