import * as utils from '../src/js/utils';

function buildDummyTarget(specs) {
    let target = document.createElement('div');
    if(specs){
        setStyles(specs.style, target);
        specs && specs.class ? target.setAttribute('class', specs.class) : target;
    }
    return target;
}

function setStyles(style, target) {
    if(style) {
        style.marginBottom ? target.style.marginBottom = style.marginBottom : target;
        style.marginTop ? target.style.marginTop = style.marginTop : target;
        style.display ? target.style.display = style.display : target;
    }
    return target;
}

describe('getLastItem', () => {
    test('returns last item in array', () => {
        expect(utils.getLastItem([1,2,3])).toEqual(3);
    });

    test('returns null if array has length of 0', () => {
        expect(utils.getLastItem([])).toBeNull();
    });
});

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
        let target = buildDummyTarget({class: 'sb-fade-in', style: {display: utils.DISPLAY_BLOCK}});
        let hideEvent = new Event(utils.ANIMATION_EVENT);
        utils.hide(target);
        expect(target.style.display).toBe(utils.DISPLAY_BLOCK);
        target.dispatchEvent(hideEvent);
        expect(target.style.display).toBe(utils.DISPLAY_NONE);
    });

});

describe('isEmptyString', () => {
    test('undefined is considered to be an empty string', () => {
        expect(utils.isEmptyString(undefined)).toBeTruthy();
    });

    test('null is considered to be an empty string', () => {
        expect(utils.isEmptyString(null)).toBeTruthy();
    });

    test('"" is considered to be an empty string', () => {
        expect(utils.isEmptyString("")).toBeTruthy();
    });

    test('non-empty string', () => {
        expect(utils.isEmptyString("text")).toBeFalsy();
    });
});


describe('addClass', () => {
    let newClass = 'new-class';
    test('add class to naked DOM element', () => {
        let target = buildDummyTarget();
        utils.addClass(target, newClass);
        expect(target.classList).toContain(newClass);
    });

    test('add to DOM element which already has it doesnt add it again', () => {
        let target = buildDummyTarget({class: newClass});
        utils.addClass(target, newClass);
        expect(target.classList).toContain(newClass);
        expect(target.classList.length).toEqual(1);
    });
});

describe('removeClass', () => {
    let dummyClass = 'dummy';
    test('remove a class that was already there', () => {
        let target = buildDummyTarget({class: dummyClass});
        utils.removeClass(target, dummyClass);
        expect(target.className).toBe('');
    });

    test('remove a class that was added', () => {
        let target = buildDummyTarget();
        utils.addClass(target, dummyClass);
        utils.removeClass(target, dummyClass);
        expect(target.className).toBe('');
    });

    test('only remove the targeted class', () => {
        let baseClass = 'base-class';
        let target = buildDummyTarget({class: baseClass});
        utils.addClass(target, dummyClass);
        utils.removeClass(target, dummyClass);
        expect(target.className).toBe(baseClass);
    });
});

describe('getFullHeight', () => {
    test('NaN when margins aren\'t set', () => {
        let target = buildDummyTarget();
        expect(utils.getFullHeight(target)).toBe(NaN);
    });

    test('get the height when marginTop and marginBottom are set', () => {
        let target = buildDummyTarget({style: {marginTop: '2px', marginBottom: '2px'}});
        expect(utils.getFullHeight(target)).toEqual(4);
    });
});
