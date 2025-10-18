import { FC, useState } from 'react';
import { Box, Heading, Stack, Text, IconButton, Flex, Spinner } from '@chakra-ui/react';
import { IoRefreshOutline } from 'react-icons/io5';
import { Stock } from './StockDetails';
import { getPolygonClient } from '../services/polygonClient';
import { ListTickersMarketEnum, ListTickersOrderEnum } from '@polygon.io/client-js';

interface StockListProps {
    onSelectStock: (stock: Stock) => void;
    selectedStock: Stock | null;
}

const defaultStocks: Stock[] = [
    {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        price: 178.25,
        change: 2.35,
        changePercent: 1.34,
        marketCap: '$2.78T',
        volume: '52.3M',
    },
    {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 142.68,
        change: -1.22,
        changePercent: -0.85,
        marketCap: '$1.79T',
        volume: '28.4M',
    },
    {
        ticker: 'MSFT',
        name: 'Microsoft Corporation',
        price: 378.91,
        change: 4.56,
        changePercent: 1.22,
        marketCap: '$2.82T',
        volume: '23.1M',
    },
];

export const StockList: FC<StockListProps> = ({ onSelectStock, selectedStock }) => {
    const [stocks, setStocks] = useState<Stock[]>(defaultStocks);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTickers = async () => {
        const client = getPolygonClient();

        if (!client) {
            alert('Please configure your Polygon.io API key in Settings');
            return;
        }

        setIsLoading(true);
        try {
            // Fetch popular tickers using the reference API
            client.getTicker;
            const response = await client.listTickers(
                undefined,
                undefined,
                ListTickersMarketEnum.Stocks,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                true,
                undefined,
                undefined,
                undefined,
                undefined,
                ListTickersOrderEnum.Asc,
                1000
            );
            console.log(response);

            if (response.results && response.results.length > 0) {
                const fetchedStocks: Stock[] = response.results.map(ticker => ({
                    ticker: ticker.ticker,
                    name: ticker.name || ticker.ticker,
                }));

                setStocks(fetchedStocks);
            }
        } catch (error: any) {
            console.error('Error fetching tickers:', error);
            alert(`Failed to fetch tickers: ${error.message || 'Please check your API key and try again.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box w="300px" h="100vh" bg="gray.800" borderRight="1px solid" borderColor="gray.700" p={4}>
            <Flex alignItems="center" justifyContent="space-between" mb={4}>
                <Heading size="md" color="white">
                    Stock List
                </Heading>
                <IconButton
                    aria-label="Refresh stocks"
                    onClick={fetchTickers}
                    disabled={isLoading}
                    variant="ghost"
                    size="sm"
                    color="white"
                    _hover={{ bg: 'gray.700' }}
                >
                    {isLoading ? <Spinner size="sm" /> : <IoRefreshOutline size={20} />}
                </IconButton>
            </Flex>
            <Stack gap={2} overflowY="auto" maxH="calc(100vh - 100px)">
                {stocks.map(stock => (
                    <Box
                        width="90%"
                        key={stock.ticker}
                        p={3}
                        bg={selectedStock?.ticker === stock.ticker ? 'blue.700' : 'gray.700'}
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={selectedStock?.ticker === stock.ticker ? 'blue.500' : 'gray.600'}
                        cursor="pointer"
                        _hover={{ bg: selectedStock?.ticker === stock.ticker ? 'blue.600' : 'gray.600' }}
                        onClick={() => onSelectStock(stock)}
                    >
                        <Text fontWeight="bold" color="white">
                            {stock.ticker}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                            {stock.name}
                        </Text>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};
