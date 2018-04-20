import { removeClass, addClass } from '../utils.js';
import { className, styleValue } from '../consts.js';

class Element {
    constructor() {
        this.tagType = {
            DIV: 'div',
            SPAN: 'span',
            INPUT: 'input',
            UL: 'ul',
            LI: 'li',
            TIME: 'time',
            LABEL: 'label',
            A: 'a',
            IMG: 'img',
            VIDEO: 'video'
        };
        this.eventName = {
            CLICK: 'click',
            KEYDOWN: 'keydown',
            KEYUP: 'keyup',
            CHANGE: 'change',
            SCROLL: 'scroll',
            PASTE: 'paste'
        };
    }

    /*Create Elements*/

    createDiv() {
        return document.createElement(this.tagType.DIV);
    }

    createTime() {
        return document.createElement(this.tagType.TIME);
    }

    createA() {
        return document.createElement(this.tagType.A);
    }

    createImg() {
        return document.createElement(this.tagType.IMG);
    }

    createSpan() {
        return document.createElement(this.tagType.SPAN);
    }

    createLabel() {
        return document.createElement(this.tagType.LABEL);
    }

    createInput() {
        return document.createElement(this.tagType.INPUT);
    }

    createUl() {
        return document.createElement(this.tagType.UL);
    }

    createLi() {
        return document.createElement(this.tagType.LI);
    }

    createVideo() {
        return document.createElement(this.tagType.VIDEO);
    }

    _setClass(...args) {
        args.reduce((target, classes) => {
            return target.className += classes.join(' ');
        });
    }

    _setContent(target, text) {
        target.innerHTML = text;
    }

    _addContent(target, text) {
        target.innerHTML += text;
    }

    _setBackgroundImage(target, url) {
        target.style.backgroundImage = `url(${url})`;
    }
    _setBackgroundSize(target, size) {
        target.style.backgroundSize = size;
    }

    _setFontSize(target, size) {
        target.style.fontSize = size ? `${size}px` : null;
    }

    _setImageHeight(target, height) {
        target.style.height = `${height}px`;
    }

    _setWidth(target, width) {
        target.style.width = `${width}px`;
    }

    _setDataset(target, name, data) {
        target.setAttribute(`data-${name}`, data);
    }

    _setClickEvent(...args) {
        args.reduce((target, action) => {
            target.addEventListener(this.eventName.CLICK, () => {
                action();
            });
        });
    }

    _setPasteEvent(...args) {
        args.reduce((target, action) => {
            target.addEventListener(this.eventName.PASTE, (event) => {
                action(event);
            });
        });
    }

    _setKeyupEvent(...args) {
        args.reduce((target, action) => {
            target.addEventListener(this.eventName.KEYUP, (event) => {
                action(event);
            });
        });
    }

    _setKeydownEvent(...args) {
        args.reduce((target, action) => {
            target.addEventListener(this.eventName.KEYDOWN, (event) => {
                action(event);
            });
        });
    }

    _setChangeEvent(...args) {
        args.reduce((target, action) => {
            target.addEventListener(this.eventName.CHANGE, () => {
                action();
            });
        });
    }

    _setScrollEvent(...args) {
        args.reduce((target, action) => {
            target.addEventListener(this.eventName.SCROLL, () => {
                action();
            });
        });
    }

    _isBottom(target, list) {
        return target.scrollTop + target.offsetHeight >= list.offsetHeight;
    }

    enabledToggle(target, isEnabled) {
        if (isEnabled || isEnabled === undefined) {
            removeClass(target, className.DISABLED);
            target.style.cursor = styleValue.CURSOR_INIT;
        }
        else {
            addClass(target, className.DISABLED);
            target.style.cursor = styleValue.CURSOR_DEFAULT;
        }
    }

}

export { Element as default };
