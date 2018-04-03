import Element from '../src/js/elements/elements';

let testElement = new Element();

describe('new', () => {
    test('can be instantiated', () => {
        expect(testElement).toBeInstanceOf(Element);
    });

    test('it sets all of its tag types correctly', () => {
        expect(testElement.tagType.A).toBe('a');
        expect(testElement.tagType.DIV).toBe('div');
        expect(testElement.tagType.SPAN).toBe('span');
        expect(testElement.tagType.UL).toBe('ul');
        expect(testElement.tagType.LI).toBe('li');
        expect(testElement.tagType.TIME).toBe('time');
        expect(testElement.tagType.LABEL).toBe('label');
        expect(testElement.tagType.IMG).toBe('img');
        expect(testElement.tagType.VIDEO).toBe('video');
    });

    test('it sets all of its events correctly', () => {
        expect(testElement.eventName.CLICK).toBe('click');
        expect(testElement.eventName.KEYDOWN).toBe('keydown');
        expect(testElement.eventName.KEYUP).toBe('keyup');
        expect(testElement.eventName.CHANGE).toBe('change');
        expect(testElement.eventName.SCROLL).toBe('scroll');
        expect(testElement.eventName.PASTE).toBe('paste');
    });
});

describe('HTML element creation tests', () => {
    test('div', () => {
        expect(testElement.createDiv()).toBeInstanceOf(HTMLDivElement);
    });
    test('time', () => {
        expect(testElement.createTime()).toBeInstanceOf(HTMLTimeElement);
    });
    test('anchor', () => {
        expect(testElement.createA()).toBeInstanceOf(HTMLAnchorElement);
    });
    test('image', () => {
        expect(testElement.createImg()).toBeInstanceOf(HTMLImageElement);
    });
    test('span', () => {
        expect(testElement.createSpan()).toBeInstanceOf(HTMLSpanElement);
    });
    test('label', () => {
        expect(testElement.createLabel()).toBeInstanceOf(HTMLLabelElement);
    });
    test('input', () => {
        expect(testElement.createInput()).toBeInstanceOf(HTMLInputElement);
    });
    test('ul', () => {
        expect(testElement.createUl()).toBeInstanceOf(HTMLUListElement);
    });
    test('li', () => {
        expect(testElement.createLi()).toBeInstanceOf(HTMLLIElement);
    });
});

describe('_setClass', () => {

    test('can handle one class', () => {
        let div = testElement.createDiv();
        testElement._setClass(div, ['someclass']);
        expect(div.className).toBe('someclass');
    });

    test('can multiple one classes', () => {
        let div = testElement.createDiv();
        testElement._setClass(div, ['someclass','anotherclass']);
        expect(div.className).toBe('someclass anotherclass');
    });
});

test('setContent', () => {
    let div = testElement.createDiv();
    testElement._setContent(div, 'some content');
    expect(div.innerHTML).toBe('some content');
});
