const ANIMATION_EVENT = 'animationend';
const ANIMATION_REGEX = 'sb-fade.*';
const DISPLAY_BLOCK = 'block';
const DISPLAY_NONE = 'none';

let hasClassRegex = (target, classNameRegex) => {
    return new RegExp(`(^| )${classNameRegex}( |$)`, 'gi').test(target.className);
};

export function hide(target) {
    if (target) {
        if (hasClassRegex(target, ANIMATION_REGEX)) {
            let hideAnimationEvent;
            target.addEventListener(ANIMATION_EVENT, hideAnimationEvent = function() {
                target.style.display = DISPLAY_NONE;
                target.removeEventListener(ANIMATION_EVENT, hideAnimationEvent, false);
            });
        }
        else {
            target.style.display = DISPLAY_NONE;
        }
    }
}

export function show(target, displayType) {
    if (target) {
        displayType ? target.style.display = displayType : target.style.display = DISPLAY_BLOCK;
    }
}

export function hasClass(...args) {
    return args.reduce((target, className) => {
        if (target.classList) {
            return target.classList.contains(className);
        }
        else {
            return new RegExp(`(^| )${className}( |$)`, 'gi').test(target.className);
        }
    });

}

export function addClass(...args) {
    return args.reduce((target, className) => {
        if (target.classList&&!(className in target.classList)) {
            target.classList.add(className);
        }
        else {
            if (target.className.indexOf(className) < 0) {
                target.className += ` ${className}`;
            }
        }
        return target;
    });
}

export function removeClass(...args) {
    return args.reduce((target, className) => {
        if (target.classList) {
            target.classList.remove(className);
        }
        else {
            target.className = target.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), '');
        }
        return target;
    });
}

export function isEmptyString(target) {
    return target === null || target === undefined || target.length === 0;
}

export function removeWhiteSpace(target) {
    return target.replace(/ /g,'');
}

export function getFullHeight(target) {
    let height = target.offsetHeight;
    let style = getComputedStyle(target);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

export function insertMessageInList(target, index, item) {
    return target.splice(index, 0, item);
}

export function getLastItem(target) {
    return target.length < 1 ? null : target[target.length - 1];
}

export function xssEscape(target) {
    if (typeof target === 'string') {
        return target
        .split('&').join('&amp;')
        .split('#').join('&#35;')
        .split('<').join('&lt;')
        .split('>').join('&gt;')
        .split('"').join('&quot;')
        .split('\'').join('&apos;')
        .split('+').join('&#43;')
        .split('-').join('&#45;')
        .split('(').join('&#40;')
        .split(')').join('&#41;')
        .split('%').join('&#37;');
    } else {
        return target;
    }
}

export function requestNotification() {
    if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission(function (permission) {
            if (Notification.permission !== permission) {
                Notification.permission = permission;
            }
        });
    }
}

export function setCookie(userId, nickname) {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let expires = date.toGMTString();
    document.cookie = `sendbirdUserId=${userId};expires=${expires}`;
    document.cookie = `sendbirdNickname=${nickname};expires=${expires}`;
}

export function getCookie() {
    let sendbirdUserInfo = {
        'userId': '',
        'nickname': ''
    };
    let cUserId = 'sendbirdUserId=';
    let cNickname = 'sendbirdNickname=';
    let cList = document.cookie.split(';');
    for (let i = 0 ; i < cList.length ; i++) {
        let c = cList[i];
        while(c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cUserId) === 0) {
            sendbirdUserInfo['userId'] = c.substring(cUserId.length, c.length);
        }
        else if (c.indexOf(cNickname) === 0) {
            sendbirdUserInfo['nickname'] = c.substring(cNickname.length, c.length);
        }
    }
    return sendbirdUserInfo;
}
