import { resolve } from 'path';

const r = (p: string) => resolve(__dirname, p);

export const aliases: Record<string, string> = {
    '~~': r('.'),
    '~~/': r('./'),
    '@@': r('.'),
    '@@/': r('./'),
    // ... other aliases
};