export async function asyncLocalGet(key: string): Promise<string | null> {
    try {
        const v =await localStorage.getItem(key);
        if (v !== null) {
            return v;
        }
        return null; 
    } catch (e) {
        console.error('Storage Util Error\nGet Item: ' + e);
        return null;
    }
}