import {
    className,
    MAX_COUNT,
    MAX_FONT_SIZE
} from '../consts.js';
import {
    show,
    hide,
    isEmptyString,
    removeWhiteSpace
} from '../utils.js';
import Element from './elements.js';

const EMPTY_STRING = '';

const NEW_CHAT_TOOLTIP_TEXT = 'New Message';

const TITLE_TOP_LOGIN = 'SendBird Widget';
const TITLE_TOP_CHANNEL = 'Channel List';
const TITLE_LOGIN_USER_ID = 'USER ID';
const TITLE_LOGIN_NICKNAME = 'NICKNAME';
const TITLE_LOGIN_BTN = 'Start Chat';
const TITLE_EMPTY_ITEM = 'Click below to start';
const TITLE_EMPTY_BTN = 'Create';

const INPUT_TYPE = 'text';
const INPUT_MAX_LENGTH = 20;

class ListBoard extends Element {
    constructor(widget) {
        super();
        this._createBoard();
        widget.appendChild(this.self);

        this.createLoginForm();
        this.createChannelListBoard();
    }

    reset() {
        this._setContent(this.list, EMPTY_STRING);
        this._cleanLoginForm();
    }

    _createBoard() {
        this.self = this.createDiv();
        this._setClass(this.self, [className.CHANNEL_BOARD]);

        let boardTop = this.createDiv();
        this._setClass(boardTop, [className.BOARD_TOP]);

        this.topTitle = this.createDiv();
        this._setClass(this.topTitle, [className.TITLE]);
        this._setContent(this.topTitle, TITLE_TOP_LOGIN);
        boardTop.appendChild(this.topTitle);

        this.btnMini = this.createDiv();
        this._setClass(this.btnMini, [className.BTN, className.IC_MINIMIZE]);
        boardTop.appendChild(this.btnMini);

        this.btnNewChat = this.createDiv();
        this._setClass(this.btnNewChat, [className.BTN, className.IC_NEW_CHAT]);

        let newChatTooltip = this.createSpan();
        this._setClass(newChatTooltip, [className.TOOLTIP]);
        this._setContent(newChatTooltip, NEW_CHAT_TOOLTIP_TEXT);
        this.btnNewChat.appendChild(newChatTooltip);
        boardTop.appendChild(this.btnNewChat);

        this.self.appendChild(boardTop);
    }

    addMinimizeClickEvent(action) {
        this._setClickEvent(this.btnMini, action);
    }

    addNewChatClickEvent(action) {
        this._setClickEvent(this.btnNewChat, action);
    }

    createLoginForm() {
        this.loginForm = this.createDiv();
        this._setClass(this.loginForm, [className.CONTENT, className.LOGIN_FORM]);

        let userIdEl = this.createDiv();
        this._setClass(userIdEl, [className.USER_ID]);

        let idTitle = this.createDiv();
        this._setClass(idTitle, [className.TITLE]);
        this._setContent(idTitle, TITLE_LOGIN_USER_ID);
        userIdEl.appendChild(idTitle);

        this.userId = this.createInput();
        this._setClass(this.userId, [className.INPUT]);
        this.userId.type = INPUT_TYPE;
        this.userId.maxlength = INPUT_MAX_LENGTH;
        this.userId.title = TITLE_LOGIN_USER_ID;
        this._setKeyupEvent(this.userId, this._toggleLoginBtn.bind(this));
        this._setChangeEvent(this.userId, this._toggleLoginBtn.bind(this));
        userIdEl.appendChild(this.userId);
        this.loginForm.appendChild(userIdEl);

        let userNicknameEl = this.createDiv();
        this._setClass(userNicknameEl, [className.NICKNAME]);

        let nicknameTitle = this.createDiv();
        this._setClass(nicknameTitle, [className.TITLE]);
        this._setContent(nicknameTitle, TITLE_LOGIN_NICKNAME);
        userNicknameEl.appendChild(nicknameTitle);

        this.nickname = this.createInput();
        this._setClass(this.nickname, [className.INPUT]);
        this.nickname.type = INPUT_TYPE;
        this.nickname.maxlength = INPUT_MAX_LENGTH;
        this.nickname.title = TITLE_LOGIN_NICKNAME;
        this._setKeyupEvent(this.nickname, this._toggleLoginBtn.bind(this));
        this._setChangeEvent(this.nickname, this._toggleLoginBtn.bind(this));
        userNicknameEl.appendChild(this.nickname);
        this.loginForm.appendChild(userNicknameEl);

        this.btnLogin = this.createDiv();
        this._setClass(this.btnLogin, [className.LOGIN_BTN]);
        this._setContent(this.btnLogin, TITLE_LOGIN_BTN);
        this.loginForm.appendChild(this.btnLogin);
    }

    showLoginForm() {
        if (this.self.lastElementChild === this.listContent) {
            this.self.removeChild(this.listContent);
        }
        this._setContent(this.topTitle, TITLE_TOP_LOGIN);
        hide(this.btnOption);
        hide(this.btnNewChat);
        this.self.appendChild(this.loginForm);
        this._toggleLoginBtn();
    }

    _cleanLoginForm() {
        this.userId.disabled = false;
        this.nickname.disabled = false;
        this._setUserId(EMPTY_STRING);
        this._setNickname(EMPTY_STRING);
        this._setContent(this.btnLogin, TITLE_LOGIN_BTN);
        this.enabledToggle(this.btnLogin, true);
    }

    _toggleLoginBtn() {
        if (!isEmptyString(removeWhiteSpace(this.userId.value)) && !isEmptyString(removeWhiteSpace(this.nickname.value))) {
            if (this.btnLogin.innerHTML === TITLE_LOGIN_BTN) {
                this.enabledToggle(this.btnLogin, true);
            }
        }
        else {
            this.enabledToggle(this.btnLogin, false);
        }
    }

    _setUserId(value) {
        this.userId.value = value;
    }
    getUserId() {
        return this.userId.value;
    }
    _setNickname(value) {
        this.nickname.value = value;
    }
    getNickname() {
        return this.nickname.value;
    }

    addLoginClickEvent(action) {
        this._setClickEvent(this.btnLogin, action);
    }

    addKeyDownEvent(target, action) {
        this._setKeydownEvent(target, action);
    }

    createChannelListBoard() {
        this.listContent = this.createDiv();
        this._setClass(this.listContent, [className.CONTENT, className.CHANNEL_LIST]);

        this.list = this.createUl();
        this.listContent.appendChild(this.list);
    }

    showChannelList() {
        if (this.self.lastElementChild === this.loginForm) {
            this.self.removeChild(this.loginForm);
            this._cleanLoginForm();
        }
        this._setContent(this.topTitle, TITLE_TOP_CHANNEL);
        show(this.btnOption);
        show(this.btnNewChat);
        this.self.appendChild(this.listContent);
    }

    addChannelListScrollEvent(action) {
        this._setScrollEvent(this.listContent, () => {
            if (this._isBottom(this.listContent, this.list)) {
                action();
            }
        });
    }

    createChannelItem(...args) {
        let channelUrl = args[0];
        let coverUrl = args[1];
        let title = args[2];
        let time = args[3];
        let message = args[4];
        let unread = args[5];

        let item = this.createDiv();
        this._setClass(item, [className.ITEM]);
        let itemImg = this.createDiv();
        this._setClass(itemImg, [className.IMAGE]);
        this._setBackgroundImage(itemImg, coverUrl);
        item.appendChild(itemImg);

        let itemContent = this.createDiv();
        this._setClass(itemContent, [className.CONTENT]);

        let contentTop = this.createDiv();
        this._setClass(contentTop, [className.CONTENT_TOP]);
        let contentTitle = this.createDiv();
        this._setClass(contentTitle, [className.TITLE]);
        this._setContent(contentTitle, title);
        contentTop.appendChild(contentTitle);

        let contentTime = this.createTime();
        this._setContent(contentTime, time);
        contentTop.appendChild(contentTime);

        itemContent.appendChild(contentTop);

        let contentBottom = this.createDiv();
        this._setClass(contentBottom, [className.CONTENT_BOTTOM]);
        let contentLastMessage = this.createDiv();
        this._setClass(contentLastMessage, [className.LAST_MESSAGE]);
        this._setContent(contentLastMessage, message);
        contentBottom.appendChild(contentLastMessage);

        let contentUnread = this.createSpan();
        this.setUnreadCount(contentUnread, unread);
        contentBottom.appendChild(contentUnread);

        itemContent.appendChild(contentBottom);

        item.appendChild(itemContent);

        let li = this.createLi();
        this._setDataset(li, 'channel-url', channelUrl);
        li.topTitle = contentTitle;
        li.time = contentTime;
        li.message = contentLastMessage;
        li.unread = contentUnread;
        li.appendChild(item);

        return li;
    }

    checkEmptyList() {
        if (this.list.childNodes.length < 1) {
            this._createEmptyItem();
        }
        else {
            if (this.emptyItem) {
                this.list.removeChild(this.emptyItem);
                this.emptyItem = null;
            }
        }
    }

    _createEmptyItem() {
        let emptyList = this.createDiv();
        this._setClass(emptyList, [className.EMPTY_ITEM]);

        let emptyTitle = this.createDiv();
        this._setClass(emptyTitle, [className.TITLE]);
        this._setContent(emptyTitle, TITLE_EMPTY_ITEM);

        let emptyBtn = this.createDiv();
        this._setClickEvent(emptyBtn, () => {
            this.btnNewChat.click();
        });
        this._setClass(emptyBtn, [className.NEW_CHAT_BTN]);
        this._setContent(emptyBtn, TITLE_EMPTY_BTN);

        emptyList.appendChild(emptyTitle);
        emptyList.appendChild(emptyBtn);
        this.emptyItem = emptyList;
        this.list.appendChild(emptyList);
    }

    setUnreadCount(target, count) {
        count = parseInt(count);
        let sanitizeValue = (trueCondition, falseCondition) => {
            return count > 9 ? trueCondition : falseCondition;
        };
        this._setContent(target, sanitizeValue(MAX_COUNT, count.toString()));
        this._setFontSize(target, sanitizeValue(MAX_FONT_SIZE, null));
        count > 0 ? show(target) : hide(target);
    }

    addChannelClickEvent(target, action) {
        this._setClickEvent(target, action);
    }

    _getListItemsArray() {
        return Array.prototype.slice.call(this.list.childNodes, 0);
    }

    addListOnFirstIndex(target) {
        let items = this._getListItemsArray();
        items.filter((item) => {
            if (item.getAttribute('data-channel-url') === target.getAttribute('data-channel-url')) {
                this.list.removeChild(item);
            }
        });
        this.list.insertBefore(target, this.list.firstChild);
    }

    getChannelItem(channelUrl) {
        let items = this._getListItemsArray();
        let targetChannel;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.getAttribute('data-channel-url') === channelUrl) {
                targetChannel = item;
                break;
            }
        }
        return targetChannel;
    }

    setChannelUnread(channelUrl, count) {
        let target = this.getChannelItem(channelUrl);
        if (target) {
            this.setUnreadCount(target.unread, count);
        }
    }

    setChannelLastMessage(channelUrl, message) {
        let target = this.getChannelItem(channelUrl);
        if (target) {
            this._setContent(target.message, message);
        }
    }

    setChannelLastMessageTime(channelUrl, time) {
        let target = this.getChannelItem(channelUrl);
        if (target) {
            this._setContent(target.time, time);
        }
    }

    setChannelTitle(channelUrl, name) {
        let target = this.getChannelItem(channelUrl);
        if (target) {
            this._setContent(target.topTitle, name);
        }
    }
}

export { ListBoard as default };
