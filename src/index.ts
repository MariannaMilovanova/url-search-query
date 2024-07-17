export function isValidQueryValue(value: any): boolean {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value instanceof Date
    );
}

export function addQueryParam(urlObj: URL, key: string, value: any): void {
    if (Array.isArray(value)) {
        value.forEach(item => {
            if (isValidQueryValue(item)) {
                urlObj.searchParams.append(key, item instanceof Date ? item.toISOString() : item.toString());
            }
        });
    } else {
        if (isValidQueryValue(value)) {
            urlObj.searchParams.set(key, value instanceof Date ? value.toISOString() : value.toString());
        }
    }
}

export function addQueryToUrl(url: string, query: Record<string, any>): string {
    const MAX_URL_LENGTH = 2000;
    const urlObj = new URL(url);

    Object.keys(query).forEach(key => {
        const value = query[key];
        if (typeof value !== 'function') {
            addQueryParam(urlObj, key, value);
        }
    });

    let finalUrl = urlObj.toString();
    if (finalUrl.length > MAX_URL_LENGTH) {
        console.warn('URL exceeds the maximum length allowed by browsers. It will be truncated.');
        finalUrl = finalUrl.substring(0, MAX_URL_LENGTH);
    }

    return finalUrl;
}
