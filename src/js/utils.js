import {ANIMATION_EVENT, ANIMATION_REGEX, DISPLAY_NONE, DISPLAY_BLOCK} from './consts';

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

export function flipClass(target, className) {
    hasClass(target, className) ? removeClass(target, className) : addClass(target, className);

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
        Notification.requestPermission().then((permission) => {
            if (Notification.permission !== permission) {
                Notification.permission = permission;
            }
        });
    }
}

export function determineNotificationMessage(message) {
    if(message.isFileMessage()) {
        return message.name;
    } else if(message.isAdminMessage()) {
        return `${message.message} Invited by ${JSON.parse(message.data).inviter.nickname}`;
    } else {
        return `${message._sender.nickname}: ${message.message}`
    }
}

export function alphabetizeAlgo(firstUser, nextUser) {
    let firstNickname = firstUser.nickname.toUpperCase();
    let nextNickname = nextUser.nickname.toUpperCase();
    if (firstNickname < nextNickname) {
        return -1;
    }
    if (firstNickname > nextNickname) {
        return 1;
    }
    return 0;
}

export function filterUsersAlgo(additionalReqs = () => { return true; }) {
    let firstLetterBlank = (user) => { return user.nickname[0] !== ' '; };
    return (user) => {
        return user.nickname && user.userId && firstLetterBlank(user) && additionalReqs(user);
    };
}
