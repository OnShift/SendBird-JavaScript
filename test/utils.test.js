import { getLastItem } from '../src/js/utils';

test('get last item returns last item in array', () => {
    expect(getLastItem([1,2,3])).toEqual(3);
});

test('get last item returns null if array has length of 0', () => {
    expect(getLastItem([])).toBeNull();
});
