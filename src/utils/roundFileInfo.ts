import type { FileInfo } from '../config/types.ts';

export function roundFileInfo(info: FileInfo): FileInfo {
    return {
        ...info,
        average_spend_galactic: Math.round(info.average_spend_galactic),
        big_spent_at: Math.round(info.big_spent_at),
        big_spent_value: Math.round(info.big_spent_value),
        less_spent_at: Math.round(info.less_spent_at),
        less_spent_value: Math.round(info.less_spent_value),
        rows_affected: Math.round(info.rows_affected),
        total_spend_galactic: Math.round(info.total_spend_galactic),
    };
}
