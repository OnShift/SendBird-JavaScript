import { className, NO_SEARCH_RESULTS_MSG }  from '../consts.js';
import Element from './elements.js';
import { addClass } from "../utils";

class UserManagement extends Element {
    constructor() {
        super();
        this.initializeMemberVariables();
    }

    initializeMemberVariables() {
        this.searchInput = null;
        this.searchImage = null;
        this.emptySearchResults = null;
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

    createUserSearchEmptyResults() {
        let errorContainer = this.createDiv();
        this._setClass(errorContainer, [className.SEARCH_ERROR_CONTAINER]);
        this.emptySearchResults = errorContainer;

        let emptySearchResults = this.createDiv();
        this._setClass(emptySearchResults, [className.NO_SEARCH_RESULTS]);
        this._setContent(emptySearchResults, NO_SEARCH_RESULTS_MSG);

        let errorImage = this.createDiv();
        this._setClass(errorImage, [className.SEARCH_ERROR_IMG]);

        errorContainer.appendChild(errorImage);
        errorContainer.appendChild(emptySearchResults);
        return errorContainer;
    }

    removeEmptySearchResults() {
        if(this.emptySearchResults) {
            let emptySearchResults = this.emptySearchResults;
            emptySearchResults.parentNode.removeChild(emptySearchResults);
        }
        this.emptySearchResults = null;
    }

    activeSelection(user) {
        return user.getElementsByClassName(`${className.USER_SELECT} ${className.ACTIVE}`).length !== 0;
    }

    seperateAndClearUserList(users) {
        let activeUsers = [];
        while(users.length > 0) {
            let currentUser = users[0];
            if(this.activeSelection(currentUser)) {
                activeUsers.push({
                    nickname: currentUser.getElementsByClassName(className.NICKNAME)[0].textContent,
                    userId: currentUser.getElementsByClassName(`${className.USER_SELECT} ${className.ACTIVE}`)[0]
                                       .getAttribute(className.DATA_USER_ID)
                });
            }
            currentUser.parentNode.removeChild(users[0]);
        }
        return activeUsers;
    }

    filterUsersAlgo(additionalReqs = () => { return true; }) {
        let firstLetterBlank = (user) => { return user.nickname[0] !== ' '; };
        return (user) => { return user.nickname && user.userId && firstLetterBlank(user) && additionalReqs(user); };
    }

    alphabetizeAlgo(firstUser, nextUser) {
        let firstNickname = firstUser.nickname.toUpperCase();
        let nextNickname = nextUser.nickname.toUpperCase();
        let result;
        if (firstNickname < nextNickname) {
            result = -1;
        } else if (firstNickname > nextNickname) {
            result =  1;
        } else {
            result = 0;
        }
        return result;
    }
}

export { UserManagement as default };
