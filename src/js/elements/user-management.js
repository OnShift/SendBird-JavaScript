import { className, NO_SEARCH_RESULTS_MSG, ROLES }  from '../consts.js';
import Element from './elements.js';
import { addClass } from "../utils";

class UserManagement extends Element {
    constructor(role) {
        super();
        this.initializeMemberVariables(role);
    }

    initializeMemberVariables(role) {
        this.searchInput = null;
        this.searchImage = null;
        this.emptySearchResults = null;
        this.role = role;
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

    getSelectedUserIds(target) {
        let items = target.querySelectorAll(`.${className.ACTIVE}`);
        let userIds = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            userIds.push(item.getAttribute(className.DATA_USER_ID));
        }
        return userIds;
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

    filteredList(fullUserList, additionalCheck) {
        return fullUserList.filter(this.filterUsersAlgo(additionalCheck)).sort(this.alphabetizeAlgo);
    }

    restrictEmployeeAccess(user) { return user.metaData && user.metaData.role === ROLES.EMPLOYEE; }

    restrictManagerAccess(user) {
        let supportedRoles = [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR, ROLES.EMPLOYEE];
        return user.metaData && supportedRoles.includes(user.metaData.role);
    }

    filterUsersAlgo(additionalReqs) {
        let firstLetterBlank = (user) => { return user.nickname[0] !== ' '; };
        let roleRestriction = this.determineRoleRestriction();
        return (user) => { return user.nickname && user.userId && firstLetterBlank(user) && roleRestriction(user) && additionalReqs(user); };
    }

    determineRoleRestriction() {
        let roleRestriction;
        switch(this.role) {
            case ROLES.ADMINISTRATOR:
            case ROLES.SUPERVISOR:
                roleRestriction = this.restrictManagerAccess;
                break;
            case ROLES.EMPLOYEE:
                roleRestriction = this.restrictEmployeeAccess;
                break;
            case ROLES.TEST:
                roleRestriction = () => { return true; };
                break;
            default:
                throw `The role ${this.role} is unsupported; please contact your administrator`;
        }
        return roleRestriction;

    }

    alphabetizeAlgo(firstUser, nextUser) {
        let firstNickname = firstUser.nickname.toUpperCase();
        let nextNickname = nextUser.nickname.toUpperCase();
        let result = 0;

        if (firstNickname < nextNickname) {
            result--;
        } else if (firstNickname > nextNickname) {
            result++;
        }
        return result;
    }
}

export { UserManagement as default };
