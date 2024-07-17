import { addQueryToUrl } from './index';

describe('addQueryToUrl', () => {
    const baseUrl = 'https://example.com/?model=gpt-4o';

    it('should add simple query parameters', () => {
        const query = { view: 'dashboard', component: 'widget' };
        const result = addQueryToUrl(baseUrl, query);
        expect(result).toContain('view=dashboard');
        expect(result).toContain('component=widget');
    });

    it('should add array query parameters', () => {
        const query = { users: ['1', '2'] };
        const result = addQueryToUrl(baseUrl, query);
        expect(result).toContain('users=1');
        expect(result).toContain('users=2');
    });

    it('should add number query parameters', () => {
        const query = { count: 5 };
        const result = addQueryToUrl(baseUrl, query);
        expect(result).toContain('count=5');
    });

    it('should add boolean query parameters', () => {
        const query = { isActive: true };
        const result = addQueryToUrl(baseUrl, query);
        expect(result).toContain('isActive=true');
    });

    it('should add date query parameters', () => {
        const date = new Date('2024-07-17');
        const query = { date };
        const result = addQueryToUrl(baseUrl, query);
        expect(result).toContain(`date=2024-07-17T00%3A00%3A00.000Z`);
    });

    it('should ignore functions in query parameters', () => {
        const query = { func: () => {} };
        const result = addQueryToUrl(baseUrl, query);
        expect(result).not.toContain('func');
    });

    it('should ignore invalid types in query parameters', () => {
        const query = { invalidProp: { key: 'value' } };
        const result = addQueryToUrl(baseUrl, query);
        expect(result).not.toContain('invalidProp');
    });

    it('should truncate the URL if it exceeds the maximum length', () => {
        const longString = 'a'.repeat(2000);
        const query = { longParam: longString };
        const result = addQueryToUrl(baseUrl, query);
        expect(result.length).toBeLessThanOrEqual(2000);
    });

    it('should handle complex query parameters', () => {
        const query = {
            view: 'dashboard',
            component: 'widget',
            users: ['1', '2'],
            count: 5,
            isActive: true,
            date: new Date('2024-07-17'),
            invalidProp: { key: 'value' },
            func: () => {}
        };
        const result = addQueryToUrl(baseUrl, query);
        expect(result).toContain('view=dashboard');
        expect(result).toContain('component=widget');
        expect(result).toContain('users=1');
        expect(result).toContain('users=2');
        expect(result).toContain('count=5');
        expect(result).toContain('isActive=true');
        expect(result).toContain('date=2024-07-17T00%3A00%3A00.000Z');
        expect(result).not.toContain('invalidProp');
        expect(result).not.toContain('func');
    });
});
