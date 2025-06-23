import { createFilesSlice } from './slices/filesSlice.ts';
import { create } from 'zustand/react';
import type { Store } from './types.ts';
import { createCurrentFileSlice } from './slices/currentFileSlice.ts';
import {createAnalysisSlice} from "./slices/analysisSlice.ts";

export const useStore = create<Store>()((...stateTools) => ({
    ...createFilesSlice(...stateTools),
    ...createCurrentFileSlice(...stateTools),
    ...createAnalysisSlice(...stateTools),
}));
