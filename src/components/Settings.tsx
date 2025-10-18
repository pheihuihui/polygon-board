import { FC, useState, useEffect } from 'react';
import { Box, Button, IconButton, Input, Stack, Text, useDisclosure } from '@chakra-ui/react';
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from '@chakra-ui/react';
import { IoSettingsOutline } from 'react-icons/io5';
import { reinitializePolygonClient } from '../services/polygonClient';

interface SettingsProps {}

export const Settings: FC<SettingsProps> = () => {
    const { open, onOpen, onClose } = useDisclosure();
    const [llmKey, setLlmKey] = useState('');
    const [polygonKey, setPolygonKey] = useState('');

    // Load keys from localStorage on mount
    useEffect(() => {
        const savedLlmKey = localStorage.getItem('llmKey') || '';
        const savedPolygonKey = localStorage.getItem('polygonKey') || '';
        setLlmKey(savedLlmKey);
        setPolygonKey(savedPolygonKey);
    }, []);

    const handleSave = () => {
        localStorage.setItem('llmKey', llmKey);
        localStorage.setItem('polygonKey', polygonKey);

        // Reinitialize Polygon client with new API key
        reinitializePolygonClient();

        onClose();
    };

    return (
        <>
            <IconButton
                aria-label="Settings"
                onClick={onOpen}
                variant="ghost"
                size="lg"
                color="white"
                _hover={{ bg: 'gray.700' }}
            >
                <IoSettingsOutline size={24} />
            </IconButton>

            <DialogRoot open={open} onOpenChange={e => (e.open ? onOpen() : onClose())}>
                <DialogContent bg="gray.800" borderColor="gray.700">
                    <DialogHeader>
                        <DialogTitle color="white">Settings</DialogTitle>
                    </DialogHeader>
                    <DialogCloseTrigger color="white" />
                    <DialogBody>
                        <Stack gap={4}>
                            <Box>
                                <Text mb={2} fontWeight="medium" color="white">
                                    LLM Key
                                </Text>
                                <Input
                                    placeholder="Enter your LLM API key"
                                    value={llmKey}
                                    onChange={e => setLlmKey(e.target.value)}
                                    type="password"
                                    bg="gray.700"
                                    borderColor="gray.600"
                                    color="white"
                                    _placeholder={{ color: 'gray.400' }}
                                />
                            </Box>
                            <Box>
                                <Text mb={2} fontWeight="medium" color="white">
                                    Polygon.io Key
                                </Text>
                                <Input
                                    placeholder="Enter your Polygon.io API key"
                                    value={polygonKey}
                                    onChange={e => setPolygonKey(e.target.value)}
                                    type="password"
                                    bg="gray.700"
                                    borderColor="gray.600"
                                    color="white"
                                    _placeholder={{ color: 'gray.400' }}
                                />
                            </Box>
                        </Stack>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={onClose} borderColor="gray.600" color="white">
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <Button colorScheme="blue" onClick={handleSave}>
                            OK
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </>
    );
};
