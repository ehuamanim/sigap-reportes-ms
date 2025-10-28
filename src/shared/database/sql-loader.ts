// src/db/sqlLoader.ts
import { readFileSync } from 'fs';
import path from 'path';

const cache = new Map<string, string>();

export function loadSql(relativePath: string): string {
    if (!cache.has(relativePath)) {
        const fullPath = path.join(process.cwd(), 'src', relativePath);
        const text = readFileSync(fullPath, 'utf8');
        cache.set(relativePath, text);
    }
    return cache.get(relativePath)!;
}