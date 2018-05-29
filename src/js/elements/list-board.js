import {
    className,
    MAX_COUNT,
    MAX_FONT_SIZE,
    DEFAULT_PROFILE_PIC
} from '../consts.js';
import { show, hide } from '../utils.js';

import Element from './elements.js';

const NEW_CHAT_TOOLTIP_TEXT = 'New Message';
const TITLE_EMPTY_BTN = 'Create';
const TITLE_EMPTY_ITEM = 'Click below to start';
const TITLE_TOP_CHANNEL = 'Chats';
const TITLE_TOP_LOGIN = 'SendBird Widget';

class ListBoard extends Element {
    constructor(widget) {
        super();
        this._createBoard();
        widget.appendChild(this.self);
        this.createChannelListBoard();
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

    addNewChatClickEvent(action) { this._setClickEvent(this.btnNewChat, action); }

    getUserId() { return this.userId.value; }

    getNickname() { return this.nickname.value; }

    addKeyDownEvent(target, action) {this._setKeydownEvent(target, action); }

    createChannelListBoard() {
        this.listContent = this.createDiv();
        this._setClass(this.listContent, [className.CONTENT, className.CHANNEL_LIST]);

        this.list = this.createUl();
        this.listContent.appendChild(this.list);
    }

    showChannelList() {
        this._setContent(this.topTitle, TITLE_TOP_CHANNEL);
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

    createChannelItem(channelData) {
        let item = this.createDiv();
        this._setClass(item, [className.ITEM]);
        let itemImg = this.createDiv();

        let itemContent = this.createDiv();

        this._setClass(itemContent, [className.CONTENT]);
        this._setClass(itemImg, [className.IMAGE]);

        this._setBackgroundImage(itemImg, DEFAULT_PROFILE_PIC);
        let contentTop = this.createDiv();
        itemContent.appendChild(itemImg);

        this._setClass(contentTop, [className.CONTENT_TOP]);
        let contentTitle = this.createDiv();
        this._setClass(contentTitle, [className.TITLE]);
        this._setContent(contentTitle, channelData.nicknames);
        contentTop.appendChild(contentTitle);

        let contentTime = this.createTime();
        this._setContent(contentTime, channelData.messageTime);
        contentTop.appendChild(contentTime);

        itemContent.appendChild(contentTop);

        let contentBottom = this.createDiv();
        this._setClass(contentBottom, [className.CONTENT_BOTTOM]);
        let contentLastMessage = this.createDiv();
        this._setClass(contentLastMessage, [className.LAST_MESSAGE]);
        this._setContent(contentLastMessage, channelData.lastMessage);
        contentBottom.appendChild(contentLastMessage);

        let contentUnread = this.createSpan();
        this.setUnreadCount(contentUnread, channelData.unreadCount);
        contentBottom.appendChild(contentUnread);

        itemContent.appendChild(contentBottom);

        item.appendChild(itemContent);

        let li = this.createLi();
        this._setDataset(li, 'channel-url', channelData.channelUrl);
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
