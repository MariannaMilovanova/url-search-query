"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('addQueryToUrl', function () {
    var baseUrl = 'https://example.com/?model=gpt-4o';
    it('should add simple query parameters', function () {
        var query = { view: 'dashboard', component: 'widget' };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
        expect(result).toContain('view=dashboard');
        expect(result).toContain('component=widget');
    });
    it('should add array query parameters', function () {
        var query = { users: ['1', '2'] };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
        expect(result).toContain('users=1');
        expect(result).toContain('users=2');
    });
    it('should add number query parameters', function () {
        var query = { count: 5 };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
        expect(result).toContain('count=5');
    });
    it('should add boolean query parameters', function () {
        var query = { isActive: true };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
        expect(result).toContain('isActive=true');
    });
    it('should add date query parameters', function () {
        var date = new Date('2024-07-17');
        var query = { date: date };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
        expect(result).toContain("date=2024-07-17T00%3A00%3A00.000Z");
    });
    it('should ignore functions in query parameters', function () {
        var query = { func: function () { } };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
        expect(result).not.toContain('func');
    });
    it('should ignore invalid types in query parameters', function () {
        var query = { invalidProp: { key: 'value' } };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
        expect(result).not.toContain('invalidProp');
    });
    it('should truncate the URL if it exceeds the maximum length', function () {
        var longString = 'a'.repeat(2000);
        var query = { longParam: longString };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
        expect(result.length).toBeLessThanOrEqual(2000);
    });
    it('should handle complex query parameters', function () {
        var query = {
            view: 'dashboard',
            component: 'widget',
            users: ['1', '2'],
            count: 5,
            isActive: true,
            date: new Date('2024-07-17'),
            invalidProp: { key: 'value' },
            func: function () { }
        };
        var result = (0, index_1.addQueryToUrl)(baseUrl, query);
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
