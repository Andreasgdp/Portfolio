// page-load-store.ts

import { writable } from 'svelte/store';

export const pageLoadStore = writable(false);