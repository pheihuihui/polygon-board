import { FC } from 'react';
import { Box, Heading, Text, Stack, Flex, Badge } from '@chakra-ui/react';

export interface Stock {
    ticker: string;
    name: string;
    price?: number;
    change?: number;
    changePercent?: number;
    marketCap?: string;
    volume?: string;
}

interface StockDetailsProps {
    stock: Stock | null;
}

export const StockDetails: FC<StockDetailsProps> = ({ stock }) => {
    if (!stock) {
        return (
            <Box flex={1} p={8} display="flex" alignItems="center" justifyContent="center" bg="gray.900">
                <Text color="gray.400" fontSize="lg">
                    Select a stock to view details
                </Text>
            </Box>
        );
    }

    const isPositive = (stock.change ?? 0) >= 0;

    return (
        <Box flex={1} p={8} bg="gray.900">
            <Stack gap={6}>
                <Box>
                    <Flex alignItems="center" gap={3} mb={2}>
                        <Heading size="xl" color="white">
                            {stock.ticker}
                        </Heading>
                        <Badge colorScheme={isPositive ? 'green' : 'red'} fontSize="md" px={3} py={1}>
                            {isPositive ? '+' : ''}
                            {stock.changePercent?.toFixed(2)}%
                        </Badge>
                    </Flex>
                    <Text fontSize="lg" color="gray.400">
                        {stock.name}
                    </Text>
                </Box>

                <Box>
                    <Text fontSize="4xl" fontWeight="bold" color="white">
                        ${stock.price?.toFixed(2)}
                    </Text>
                    <Text fontSize="lg" color={isPositive ? 'green.400' : 'red.400'}>
                        {isPositive ? '+' : ''}${stock.change?.toFixed(2)} Today
                    </Text>
                </Box>

                <Stack gap={4}>
                    <Box p={4} bg="gray.800" borderRadius="md" borderWidth="1px" borderColor="gray.700">
                        <Text fontSize="sm" color="gray.400" mb={1}>
                            Market Cap
                        </Text>
                        <Text fontSize="xl" fontWeight="semibold" color="white">
                            {stock.marketCap || 'N/A'}
                        </Text>
                    </Box>

                    <Box p={4} bg="gray.800" borderRadius="md" borderWidth="1px" borderColor="gray.700">
                        <Text fontSize="sm" color="gray.400" mb={1}>
                            Volume
                        </Text>
                        <Text fontSize="xl" fontWeight="semibold" color="white">
                            {stock.volume || 'N/A'}
                        </Text>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};
