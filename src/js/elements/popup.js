import { className, MAX_COUNT } from '../consts.js';
import Element from './elements.js';
import { addClass, show, hide, xssEscape } from '../utils.js';

const EMPTY_STRING = '';
const TITLE_POPUP_INVITE_BTN = 'Invite';
const TITLE_POPUP_INVITE_LIST = 'Invite Members';
const TITLE_POPUP_MEMBER_LIST = 'Member List';

class Popup extends Element {
    constructor() {
        super();
        this._createMemberPopup();
        this._createInvitePopup();
    }

    closeMemberPopup() {
        hide(this.memberPopup);
        this._setContent(this.memberPopup.list, EMPTY_STRING);
    }

    closeInvitePopup() {
        hide(this.invitePopup);
        this._setContent(this.invitePopup.list, EMPTY_STRING);
        this._setContent(this.invitePopup.count, '0');
        this._setContent(this.invitePopup.inviteBtn, TITLE_POPUP_INVITE_BTN);
        addClass(this.invitePopup.inviteBtn, className.DISABLED);
    }

    showInvitePopup(chatSection) {
        chatSection.appendChild(this.invitePopup);
        show(this.invitePopup);
    }

    _createMemberPopup() {
        this.memberPopup = this.createDiv();
        this._setClass(this.memberPopup, [className.POPUP, className.MEMBERS]);

        let popupBody = this.createDiv();
        this._setClass(popupBody, [className.POPUP_BODY]);

        let popupTop = this.createDiv();
        this._setClass(popupTop, [className.POPUP_TOP]);

        let topTitle = this.createDiv();
        this._setClass(topTitle, [className.TITLE]);
        this._setContent(topTitle, TITLE_POPUP_MEMBER_LIST);
        popupTop.appendChild(topTitle);

        let topCount = this.createDiv();
        this._setClass(topCount, [className.COUNT]);
        this._setContent(topCount, '0');
        popupTop.appendChild(topCount);

        this.memberCloseBtn = this.createDiv();
        this._setClass(this.memberCloseBtn, [className.BTN, className.IC_CLOSE]);
        popupTop.appendChild(this.memberCloseBtn);

        popupBody.appendChild(popupTop);

        let popupContent = this.createDiv();
        this._setClass(popupContent, [className.CONTENT]);

        let ul = this.createUl();
        popupContent.appendChild(ul);

        popupBody.appendChild(popupContent);

        this.memberPopup.list = ul;
        this.memberPopup.count = topCount;
        this.memberPopup.appendChild(popupBody);
    }

    updateCount(target, count) {
        count = parseInt(count);
        let text = count > 9 ? MAX_COUNT : count.toString();
        this._setContent(target, text);
    }

    createMemberItem(member, isActive) {
        let li = this.createLi();
        this._setClass(li, [className.USER_LIST]);
        let div = this.createDiv();

        let userSelect = this.createDiv();
        this._setClass(userSelect, isActive ? [className.USER_SELECT, className.ACTIVE] : [className.USER_SELECT]);
        this._setDataset(userSelect, 'user-id', member.userId);
        li.select = userSelect;
        div.appendChild(userSelect);

        let userProfile = this.createDiv();
        this._setClass(userProfile, [className.IMAGE]);
        div.appendChild(userProfile);

        let userNickname = this.createDiv();
        this._setClass(userNickname, [className.NICKNAME]);
        this._setContent(userNickname, xssEscape(member.nickname));
        div.appendChild(userNickname);

        li.appendChild(div);
        return li;
    }

    _createInvitePopup() {
        this.invitePopup = this.createDiv();
        this._setClass(this.invitePopup, [className.POPUP, className.INVITE]);

        let popupBody = this.createDiv();
        this._setClass(popupBody, [className.POPUP_BODY]);

        let popupContent = this.createDiv();
        this._setClass(popupContent, [className.CONTENT]);

        let ul = this.createUl();
        popupContent.appendChild(ul);
        popupBody.appendChild(popupContent);

        let popupBottom = this.createDiv();
        this._setClass(popupBottom, [className.POPUP_BOTTOM]);

        let bottomTitle = this.createDiv();
        this._setClass(bottomTitle, [className.TITLE]);
        this._setContent(bottomTitle, TITLE_POPUP_INVITE_LIST);
        popupBottom.appendChild(bottomTitle);

        let bottomCount = this.createDiv();
        this._setClass(bottomCount, [className.COUNT]);
        this._setContent(bottomCount, '0');
        popupBottom.appendChild(bottomCount);

        let bottomInvite = this.createDiv();
        this._setClass(bottomInvite, [className.INVITE_BTN, className.DISABLED]);
        this._setContent(bottomInvite, TITLE_POPUP_INVITE_BTN);
        popupBottom.appendChild(bottomInvite);

        popupBody.appendChild(popupBottom);
        this.invitePopup.content = popupContent;
        this.invitePopup.list = ul;
        this.invitePopup.count = bottomCount;
        this.invitePopup.inviteBtn = bottomInvite;
        this.invitePopup.appendChild(popupBody);
    }

    addCloseBtnClickEvent(action) {
        this._setClickEvent(this.memberCloseBtn, () => {
            action();
        });
    }

    addClickEvent(target, action) {
        this._setClickEvent(target, action);
    }

}

export { Popup as default };
