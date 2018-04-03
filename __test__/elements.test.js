import Element from '../src/js/elements/elements';

describe('new', () => {
    test('can be instantiated', () => {
        let element = new Element();
        expect(element).toBeTruthy;
    });
});
