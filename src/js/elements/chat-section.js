import { className, MAX_COUNT } from '../consts.js';
import Element from './elements.js';
import {
  show,
  hide,
  getFullHeight,
  removeClass,
  xssEscape
} from '../utils.js';

const CHAT_SECTION_RIGHT_MAX = '-20px';
const CHAT_SECTION_RIGHT_MIN = '60px';
const DISPLAY_NONE = 'none';
const DISPLAY_TYPE_INLINE_BLOCK = 'inline-block';
const EMPTY_STRING = '';
const IMAGE_MAX_SIZE = 160;
const MARGIN_TOP_MESSAGE = '3px';
const MEMBER_COUNT_DEFAULT = '0';
const MESSAGE_CONTENT_HEIGHT_DEFAULT = 328;
const MESSAGE_INPUT_HEIGHT_DEFAULT = 29;
const MESSAGE_NONE_IMAGE_HEIGHT = '10px';
const MESSAGE_TYPING_MEMBER = ' is typing...';
const MESSAGE_TYPING_SEVERAL = 'Several people are typing...';
const TEXT_FILE_DOWNLOAD = 'Download';
const TITLE_CHAT_CANCEL_BTN = 'Cancel';
const TITLE_CHAT_LEAVE_BTN = 'Leave';
const TITLE_CHAT_LEAVE_POPUP = 'Do you really want to leave?';
const TITLE_CHAT_TITLE_DEFAULT = 'Group Channel';
const TITLE_CHAT_TITLE_NEW_CHAT = 'New Chat';
const TITLE_START_CHAT_BTN = 'Start Chat';
const TOOLTIP_CHANNEL_LEAVE = 'Channel Leave';
const TOOLTIP_INVITE_MEMBER = 'Invite Member';
const TOOLTIP_MEMBER_LIST = 'Member List';

class ChatSection extends Element {
    constructor(widget) {
        super();
        this._create();
        widget.appendChild(this.self);
        this.textKr = EMPTY_STRING;
    }

    reset() {
        this._setContent(this.self, EMPTY_STRING);
    }

    _create() {
        this.self = this.createDiv();
        this._setClass(this.self, [className.CHAT_SECTION]);
    }

    responsiveSize(isMax, action) {
        if (isMax !== undefined) {
            this.self.style.right = isMax ? CHAT_SECTION_RIGHT_MIN : CHAT_SECTION_RIGHT_MAX;
        }
        action();
    }

    _getListBoardArray() {
        return Array.prototype.slice.call(this.self.childNodes, 0);
    }

    moveToFirstIndex(target) {
        let items = this._getListBoardArray();
        items.filter((item) => {
            if (item.id === target.id) {
                this.self.removeChild(item);
            }
        });
        this.self.insertBefore(target, this.self.firstChild);
    }

    setWidth(width) {
        this._setWidth(this.self, width);
    }

    /*Chat*/

    createChatBoard(channelUrl, isLast) {
        let chatBoard = this.createDiv();
        this._setClass(chatBoard, [className.CHAT_BOARD]);
        chatBoard.id = channelUrl ? channelUrl : '';

        let chatTop = this.createDiv();
        this._setClass(chatTop, [className.TOP]);

        let chatTitle = this.createDiv();
        this._setClass(chatTitle, [className.TITLE]);
        this._setContent(chatTitle, TITLE_CHAT_TITLE_DEFAULT);
        chatBoard.topTitle = chatTitle;
        chatTop.appendChild(chatTitle);

        let chatMemberCount = this.createDiv();
        this._setClass(chatMemberCount, [className.COUNT]);
        this._setContent(chatMemberCount, MEMBER_COUNT_DEFAULT);
        chatBoard.count = chatMemberCount;
        chatTop.appendChild(chatMemberCount);

        let topBtnClose = this.createDiv();
        this._setClass(topBtnClose, [className.BTN, className.IC_CLOSE]);
        chatBoard.closeBtn = topBtnClose;
        chatTop.appendChild(topBtnClose);

        let topBtnLeave = this.createDiv();
        this._setClass(topBtnLeave, [className.BTN, className.IC_LEAVE]);
        chatBoard.leaveBtn = topBtnLeave;

        let tooltipLeave = this.createSpan();
        this._setClass(tooltipLeave, [className.TOOLTIP]);
        this._setContent(tooltipLeave, TOOLTIP_CHANNEL_LEAVE);

        topBtnLeave.appendChild(tooltipLeave);
        chatTop.appendChild(topBtnLeave);

        let topBtnMembers = this.createDiv();
        this._setClass(topBtnMembers, [className.BTN, className.IC_MEMBERS]);
        chatBoard.memberBtn = topBtnMembers;

        let tooltipMember = this.createSpan();
        this._setClass(tooltipMember, [className.TOOLTIP]);
        this._setContent(tooltipMember, TOOLTIP_MEMBER_LIST);

        topBtnMembers.appendChild(tooltipMember);
        chatTop.appendChild(topBtnMembers);

        let topBtnInvite = this.createDiv();
        this._setClass(topBtnInvite, [className.BTN, className.IC_INVITE]);
        chatBoard.inviteBtn = topBtnInvite;

        let tooltipInvite = this.createSpan();
        this._setClass(tooltipInvite, [className.TOOLTIP]);
        this._setContent(tooltipInvite, TOOLTIP_INVITE_MEMBER);

        topBtnInvite.appendChild(tooltipInvite);
        chatTop.appendChild(topBtnInvite);

        chatBoard.appendChild(chatTop);

        let chatContent = this.createDiv();
        this._setClass(chatContent, [className.CONTENT]);
        chatBoard.content = chatContent;
        chatBoard.appendChild(chatContent);

        isLast ? this.self.appendChild(chatBoard) : this.moveToFirstIndex(chatBoard);
        return chatBoard;
    }

    addLeavePopup(target) {
        if (!target.leavePopup) {
            let leavePopup = this.createDiv();
            this._setClass(leavePopup, [className.LEAVE_POPUP]);

            let leaveTitle = this.createDiv();
            this._setClass(leaveTitle, [className.POPUP_TOP]);
            this._setContent(leaveTitle, TITLE_CHAT_LEAVE_POPUP);
            leavePopup.appendChild(leaveTitle);

            let div = this.createDiv();
            let leaveBtn = this.createDiv();
            this._setClass(leaveBtn, [className.LEAVE_BTN]);
            this._setContent(leaveBtn, TITLE_CHAT_LEAVE_BTN);
            div.appendChild(leaveBtn);

            let cancelBtn = this.createDiv();
            this._setClickEvent(cancelBtn, () => {
                target.removeChild(leavePopup);
                target.leavePopup = null;
            });
            this._setClass(cancelBtn, [className.CANCEL_BTN]);
            this._setContent(cancelBtn, TITLE_CHAT_CANCEL_BTN);
            div.appendChild(cancelBtn);

            leavePopup.appendChild(div);

            target.leavePopup = leavePopup;
            target.leavePopup.leaveBtn = leaveBtn;
            target.insertBefore(leavePopup, target.firstChild);
        }
    }

    setLeaveBtnClickEvent(target, action) {
        this._setClickEvent(target, action);
    }

    removeMemberPopup() {
        let items = this.self.querySelectorAll(`.${  className.CHAT_BOARD}`);
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            removeClass(item.memberBtn, className.ACTIVE);
        }
    }

    removeInvitePopup() {
        let items = this.self.querySelectorAll(`.${  className.CHAT_BOARD}`);
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            removeClass(item.inviteBtn, className.ACTIVE);
        }
    }

    addClickEvent(target, action) {
        this._setClickEvent(target, action);
    }

    updateChatTop(target, count, title) {
        this._setContent(target.count, count);
        if (title !== null) {
            this._setContent(target.topTitle, title);
        }
    }

    getChatBoard(channelUrl) {
        let items = this.self.querySelectorAll(`.${  className.CHAT_BOARD}`);
        let targetBoard;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.id === channelUrl) {
                targetBoard = item;
                break;
            }
        }
        return targetBoard;
    }

    closeChatBoard(target) {
        target.parentNode.removeChild(target);
        this.textKr = '';
    }

    createMessageContent(target) {
        let chatContent = this.createDiv();
        this._setClass(chatContent, [className.CONTENT]);

        let messageContent = this.createDiv();
        this._setClass(messageContent, [className.MESSAGE_CONTENT]);

        let messageList = this.createDiv();
        this._setClass(messageList, [className.MESSAGE_LIST]);
        messageContent.appendChild(messageList);
        chatContent.appendChild(messageContent);

        let typingMessage = this.createDiv();
        this._setClass(typingMessage, [className.TYPING]);
        chatContent.appendChild(typingMessage);

        let contentInput = this.createDiv();
        this._setClass(contentInput, [className.INPUT]);

        let chatText = this.createTextInput();
        contentInput.appendChild(chatText);

        let chatFile = this.createLabel();
        this._setClass(chatFile, [className.FILE]);
        chatFile.setAttribute('for', `file_${  target.id}`);

        let chatFileInput = this.createInput();
        chatFileInput.type = 'file';
        chatFileInput.name = 'file';
        chatFileInput.id = `file_${  target.id}`;
        hide(chatFileInput);
        chatFile.appendChild(chatFileInput);
        contentInput.appendChild(chatFile);
        chatContent.appendChild(contentInput);

        target.content.parentNode.removeChild(target.content);
        target.content = chatContent;
        target.messageContent = messageContent;
        target.list = messageList;
        target.typing = typingMessage;
        target.input = chatText;
        target.file = chatFileInput;
        target.appendChild(chatContent);
    }

    createTextInput() {
        let chatText = this.createDiv();
        this._setClass(chatText, [className.TEXT]);
        chatText.setAttribute('contenteditable', true);
        return chatText;
    }

    clearInputText(target, channelUrl) {
        let items = target.querySelectorAll(this.tagType.DIV);
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            item.remove();
        }
        this._setContent(target, EMPTY_STRING);
        this.responsiveHeight(channelUrl);
    }

    addPasteEvent(target, action) {
        this._setPasteEvent(target, action);
    }

    addKeyUpEvent(target, action) {
        this._setKeyupEvent(target, action);
    }

    addKeyDownEvent(target, action) {
        this._setKeydownEvent(target, action);
    }

    addFileSelectEvent(target, action) {
        this._setChangeEvent(target, action);
    }

    addScrollEvent(target, action) {
        this._setScrollEvent(target, action);
    }

    responsiveHeight(channelUrl) {
        let targetBoard = this.getChatBoard(channelUrl);
        let messageContent = targetBoard.messageContent;
        let changeHeight = getFullHeight(targetBoard.typing) + getFullHeight(targetBoard.input);
        this._setHeight(
            messageContent,
            MESSAGE_CONTENT_HEIGHT_DEFAULT - (changeHeight - MESSAGE_INPUT_HEIGHT_DEFAULT)
        );
    }

    showTyping(channel, spinner) {
        let targetBoard = this.getChatBoard(channel.url);
        let typing = targetBoard.typing;
        if (!channel.isTyping()) {
            this._setContent(typing, EMPTY_STRING);
            hide(typing);
        } else {
            let typingUser = channel.getTypingMembers();
            spinner.insert(typing);
            let text = typingUser.length > 1 ? MESSAGE_TYPING_SEVERAL : xssEscape(typingUser[0].nickname) + MESSAGE_TYPING_MEMBER;
            this._addContent(typing, text);
            show(typing);
        }
    }

    _imageResize(imageTarget, width, height) {
        let scaleWidth = IMAGE_MAX_SIZE / width;
        let scaleHeight = IMAGE_MAX_SIZE / height;

        let scale = scaleWidth <= scaleHeight ? scaleWidth : scaleHeight;
        if (scale > 1) {
            scale = 1;
        }

        let resizeWidth = width * scale;
        let resizeHeight = height * scale;

        this._setBackgroundSize(imageTarget, `${resizeWidth  }px ${  resizeHeight  }px`);
        this._setWidth(imageTarget, resizeWidth);
        this._setHeight(imageTarget, resizeHeight);
        return {
            'resizeWidth': resizeWidth,
            'resizeHeight': resizeHeight
        };
    }

    setImageSize(target, message) {
        let url = message.thumbnails.length > 0 ? message.thumbnails[0].url : message.url;
        this._setBackgroundImage(target, url);
        if (message.thumbnails.length > 0) {
            this._imageResize(target, message.thumbnails[0].real_width, message.thumbnails[0].real_height);
        } else {
            let img = new Image();
            img.addEventListener('load', (res) => {
                res.path ? this._imageResize(target, res.path[0].width, res.path[0].height) : this._imageResize(target, res.target.width, res.target.height);
            });
            img.src = message.url;
        }
    }

    createMessageItem(message, isCurrentUser, isContinue, unreadCount) {
        let messageSet = this.createDiv();
        messageSet.id = message.messageId;
        this._setClass(messageSet, isCurrentUser ? [className.MESSAGE_SET, className.USER] : [className.MESSAGE_SET]);
        if (isContinue) {
            messageSet.style.marginTop = MARGIN_TOP_MESSAGE;
        }

        let senderImg = this.createDiv();
        this._setClass(senderImg, [className.IMAGE]);
        // investigate what this does
        isContinue ? senderImg.style.height = MESSAGE_NONE_IMAGE_HEIGHT: '';
        messageSet.appendChild(senderImg);

        let messageContent = this.createDiv();
        this._setClass(messageContent, [className.MESSAGE]);

        let senderNickname = this.createDiv();
        this._setClass(senderNickname, [className.NICKNAME]);
        this._setContent(senderNickname, xssEscape(message.sender.nickname));
        if (isContinue) {
            senderNickname.style.display = DISPLAY_NONE;
        }
        messageContent.appendChild(senderNickname);

        let messageItem = this.createDiv();
        this._setClass(messageItem, [className.MESSAGE_ITEM]);

        let itemText = this.createDiv();
        if (message.isUserMessage()) {
            this._setClass(itemText, [className.TEXT]);
            let urlexp = new RegExp('(http|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');
            let _message = message.message;
            if (urlexp.test(_message)) {
                _message = `<a href="${  _message  }${isCurrentUser ? '" target="_blank" style="color: #FFFFFF;">' : '" target="_blank" style="color: #444444;">'  }${_message  }</a>`;
                if (message.customType === 'url_preview') {
                    let previewData = JSON.parse(message.data);

                    let _siteName = this.createDiv();
                    this._setClass(_siteName, [className.PREVIEW_NAME]);
                    this._setContent(_siteName, `@${  previewData.site_name}`);

                    let _title = this.createDiv();
                    this._setClass(_title, [className.PREVIEW_TITLE]);
                    this._setContent(_title, previewData.title);

                    let _description = this.createDiv();
                    this._setClass(_description, [className.PREVIEW_DESCRIPTION]);
                    this._setContent(_description, previewData.description);
                    let _image = this.createDiv();
                    this._setClass(_image, [className.PREVIEW_IMAGE]);
                    this._setBackgroundImage(_image, previewData.image);

                    _message += `<hr>${  _siteName.outerHTML  }${_title.outerHTML  }${_description.outerHTML  }${_image.outerHTML}`;
                }
            } else {
                _message = xssEscape(_message);
            }
            this._setContent(itemText, _message);
        } else if (message.isFileMessage()) {
            if (message.type.match(/^image\/gif$/)) {
                this._setClass(itemText, [className.FILE_MESSAGE]);
                let image = this.createImg();
                this._setClass(image, [className.IMAGE]);
                image.src = message.url;
                this.setImageSize(image, message);
                itemText.appendChild(image);
            } else if (message.type.match(/^video\/.+$/)) {
                this._setClass(itemText, [className.FILE_MESSAGE]);
                let video = this.createVideo();
                video.controls = true;
                video.preload = 'auto';
                let resize = {
                    'resizeWidth': 160,
                    'resizeHeight': 160
                };
                if (message.thumbnails && message.thumbnails.length > 0) {
                    video.poster = message.thumbnails[0].url;
                    resize = this._imageResize(video, message.thumbnails[0].real_width, message.thumbnails[0].real_height);
                    video.width = resize.resizeWidth;
                    video.height = resize.resizeHeight;
                } else {
                    let _self = this;
                    video.addEventListener('loadedmetadata', function () {
                        resize = _self._imageResize(video, this.videoWidth, this.videoHeight);
                        video.width = resize.resizeWidth;
                        video.height = resize.resizeHeight;
                    });
                }
                video.src = message.url;
                itemText.appendChild(video);
            } else {
                this._setClass(itemText, [className.FILE_MESSAGE]);
                let file = this.createA();
                file.href = message.url;
                file.target = 'blank';
                if (message.type.match(/^image\/.+$/)) {
                    this._setClass(file, [className.IMAGE]);
                    this.setImageSize(file, message);
                } else {
                    this._setClass(file, [className.FILE]);
                    let fileIcon = this.createDiv();
                    this._setClass(fileIcon, [className.FILE_ICON]);

                    let fileText = this.createDiv();
                    this._setClass(fileText, [className.FILE_TEXT]);

                    let fileName = this.createDiv();
                    this._setClass(fileName, [className.FILE_NAME]);
                    this._setContent(fileName, xssEscape(message.name));
                    fileText.appendChild(fileName);

                    let fileDownload = this.createDiv();
                    this._setClass(fileDownload, [className.FILE_DOWNLOAD]);
                    this._setContent(fileDownload, TEXT_FILE_DOWNLOAD);
                    fileText.appendChild(fileDownload);

                    file.appendChild(fileIcon);
                    file.appendChild(fileText);
                }
                itemText.appendChild(file);
            }
        }

        let itemUnread = this.createDiv();
        this._setClass(itemUnread, [className.UNREAD]);
        this.setUnreadCount(itemUnread, unreadCount);
        messageSet.unread = itemUnread;

        if (isCurrentUser) {
            messageItem.appendChild(itemUnread);
            messageItem.appendChild(itemText);
        } else {
            messageItem.appendChild(itemText);
            messageItem.appendChild(itemUnread);
        }

        messageContent.appendChild(messageItem);
        messageSet.appendChild(messageContent);
        return messageSet;
    }

    createAdminMessageItem(message) {
        let admin = this.createDiv();
        this._setClass(admin, [className.MESSAGE_SET, className.ADMIN_MESSAGE]);
        this._setContent(admin, xssEscape(message.message));
        return admin;
    }

    setUnreadCount(target, count) {
        count = parseInt(count);
        let renderSingleDigitCount = (c) => {
            return c === 0 ? '' : c.toString();
        };
        let text = count > 9 ? MAX_COUNT : renderSingleDigitCount(count);
        this._setContent(target, text);
        count > 0 ? show(target, DISPLAY_TYPE_INLINE_BLOCK) : hide(target);
    }

    updateReadReceipt(channelSet, target) {
        let items = target.querySelectorAll(`.${  className.MESSAGE_SET}`);
        for (let j = 0; j < channelSet.message.length; j++) {
            let message = channelSet.message[j];
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if (item.id === message.messageId) {
                    this.setUnreadCount(item.unread, channelSet.channel.getReadReceipt(message));
                    break;
                }
            }
        }
    }

    createMessageItemTime(date) {
        let time = this.createDiv();
        this._setClass(time, [className.MESSAGE_SET, className.TIME]);
        this._setContent(time, date);
        return time;
    }

    createNewChatBoard(target) {
        let chatContent = this.createDiv();
        this._setClass(chatContent, [className.CONTENT]);

        let userContent = this.createDiv();
        this._setClass(userContent, [className.USER_CONTENT]);
        chatContent.appendChild(userContent);

        let contentBottom = this.createDiv();
        this._setClass(contentBottom, [className.CONTENT_BOTTOM]);

        let contentBottomBtn = this.createDiv();
        this._setClass(contentBottomBtn, [className.NEW_CHAT_BTN, className.DISABLED]);
        this._setContent(contentBottomBtn, TITLE_START_CHAT_BTN);
        contentBottom.appendChild(contentBottomBtn);
        chatContent.appendChild(contentBottom);

        target.content.parentNode.removeChild(target.content);
        target.content = chatContent;
        target.startBtn = contentBottomBtn;
        target.userContent = userContent;
        target.appendChild(chatContent);
        this._setContent(target.topTitle, TITLE_CHAT_TITLE_NEW_CHAT);
    }

    createUserList(target) {
        if (target.querySelectorAll(this.tagType.UL).length === 0) {
            let userList = this.createUl();
            target.list = userList;
            target.appendChild(userList);
        }
    }

    createUserListItem(user) {
        let li = this.createLi();
        let userItem = this.createDiv();
        this._setClass(userItem, [className.USER_ITEM]);

        let userSelect = this.createDiv();
        this._setClass(userSelect, [className.USER_SELECT]);
        this._setDataset(userSelect, 'user-id', user.userId);
        li.select = userSelect;
        userItem.appendChild(userSelect);

        let userProfile = this.createDiv();
        this._setClass(userProfile, [className.IMAGE]);
        userItem.appendChild(userProfile);

        let userNickname = this.createDiv();
        this._setClass(userNickname, [className.NICKNAME]);
        this._setContent(userNickname, xssEscape(user.nickname));
        userItem.appendChild(userNickname);

        li.appendChild(userItem);
        return li;
    }

    getSelectedUserIds(target) {
        let items = target.querySelectorAll(`.${  className.ACTIVE}`);
        let userIds = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            userIds.push(item.getAttribute('data-user-id'));
        }
        return userIds;
    }

    isBottom(targetContent, targetList) {
        return this._isBottom(targetContent, targetList);
    }

    addUserListScrollEvent(target, action) {
        this._setScrollEvent(target.userContent, () => {
            if (this.isBottom(target.userContent, target.userContent.list)) {
                action();
            }
        });
    }

    scrollToBottom(target) {
        target.scrollTop = target.scrollHeight - target.clientHeight;
    }

}

export { ChatSection as default };
