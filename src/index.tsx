import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { App } from './App';

const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                bg: { value: '#1a202c' },
            },
        },
    },
});

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ChakraProvider value={system}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
