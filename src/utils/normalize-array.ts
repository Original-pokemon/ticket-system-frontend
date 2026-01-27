export const normalizeToArray = <T>(data: unknown): T[] => {
    return Array.isArray(data) ? data : [];
};