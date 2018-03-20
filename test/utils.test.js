import * as utils from '../src/js/utils';

test('getLastItem:returns last item in array', () => {
    expect(utils.getLastItem([1,2,3])).toEqual(3);
});

test('getLastItem: returns null if array has length of 0', () => {
    expect(utils.getLastItem([])).toBeNull();
});


function buildDummyTarget(specs) {
    let target = document.createElement('div');
    specs && specs.class ? target.setAttribute('class', specs.class) : target;
    specs && specs.display ? target.style.display = specs.display : target;
    return target;
}

describe('show', () => {

    test('returns undefined if target is not defined', () => {
        expect(utils.show()).toBeUndefined();
    });

    test('sets display to "block" if no displayType is specified', () => {
        let target = buildDummyTarget();
        utils.show(target);
        expect(target.style.display).toBe(utils.DISPLAY_BLOCK);
    });

    test('sets display to whatever we pass it to', () => {
        let display = 'test-display';
        let target = buildDummyTarget();
        utils.show(target, display);
        expect(target.style.display).toBe(display);
    });
});

describe('hide', () => {

    test('returns undefined if target is not defined', () => {
        expect(utils.hide()).toBeUndefined();
    });

    test('sets display to "none" if the target has no animation associated with it', () => {
        let target = buildDummyTarget({class: 'no-animation'});
        utils.hide(target);
        expect(target.style.display).toBe(utils.DISPLAY_NONE);
    });

    test('adds an event handler if some animation needs to occur', () => {
        let target = buildDummyTarget({class: 'sb-fade-in', display: utils.DISPLAY_BLOCK});
        let hideEvent = new Event(utils.ANIMATION_EVENT);
        utils.hide(target);
        expect(target.style.display).toBe(utils.DISPLAY_BLOCK);
        target.dispatchEvent(hideEvent);
        expect(target.style.display).toBe(utils.DISPLAY_NONE);
    });

});
