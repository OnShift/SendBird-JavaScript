import { className, MAX_COUNT } from '../consts.js';
import Element from './elements.js';
import { addClass, removeClass, show, hide } from '../utils.js';

class WidgetBtn extends Element {
    constructor(widget) {
        super();
        this._create();
        widget.appendChild(this.self);
    }

    _create() {
        this.self = this.createDiv();
        this._setClass(this.self, [className.WIDGET_BTN, className.IC_CONNECTED]);

        this.unread = this.createDiv();
        this._setClass(this.unread, [className.NOTIFICATION]);

        this.self.appendChild(this.unread);
    }

    addClickEvent(action) {
        this._setClickEvent(this.self, action);
    }

    setUnreadCount(count) {
        count = parseInt(count);
        this._setContent(this.unread, count > 9 ? MAX_COUNT : count.toString());
        if(count > 0) {
            show(this.unread);
            removeClass(this.self, className.UNREAD);
        } else {
            hide(this.unread);
            addClass(this.self, className.UNREAD);
        }
    }
}

export { WidgetBtn as default };
