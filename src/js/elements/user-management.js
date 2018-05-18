import { className }  from '../consts.js';
import Element from './elements.js';
import { addClass } from "../utils";

class UserManagement extends Element {
    constructor() {
        super();
        this.initializeMemberVariables()
    }

    initializeMemberVariables() {
        this.searchInput = null;
        this.searchImage = null;
    }

    createSearchBox() {
        let li = this.createLi();
        let userItem = this.createDiv();
        this._setClass(userItem, [className.SEARCH]);

        let imageDiv = this.createDiv();
        this._setClass(imageDiv, [className.SEARCH_IMG]);
        this.searchImage = imageDiv;

        let searchField = this.createTextInput();
        this.searchInput = searchField;
        addClass(this.searchInput, className.SEARCH_INPUT);

        userItem.appendChild(imageDiv);
        userItem.appendChild(searchField);
        li.appendChild(userItem);
        return li;
    }
}

export { UserManagement as default };
