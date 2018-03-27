import SendBird from '../node_modules/sendbird';
import SendBirdWrapper from '../src/js/sendbird';

jest.mock('../node_modules/sendbird');

let appId = 'appId';

function verifyCall(method, numOfCalls) {
    expect(SendBird.mock.instances[0][method].mock.calls.length).toBe(numOfCalls);
}

beforeEach(() => {
    SendBird.mockClear();
});


test('when a wrapper is instantiated a new sendbird instance is as well', () => {
    new SendBirdWrapper(appId);
    expect(SendBird).toHaveBeenCalledTimes(1);
    verifyCall('constructor', 1);
});

describe('attachHandlers', () => {
    test('creates an appropriately parsed handler', () => {
        let sbWrapper = new SendBirdWrapper(appId);
        let handlerContainer = {};
        let state = 0;
        const firstNum = 5;
        const secondNum  = 10;
        let handlers = {
            messageReceivedHandler: (a, b) => { state = a + b; },
            messageUpdatedHandler: (a, b) => { state = a - b; },
            messageDeletedHandler: (a, b) => { state = a * b; },
            channelChangedHandler: (a) => { state = a; },
            typingStatusHandler: (a) => { state = -a; },
            readReceiptHandler: (a) => { state = a * a; },
            userLeftHandler: (a, b) => { state = b - a; },
            userJoinedHandler: (a, b) => { state = b / a; },
        };
        sbWrapper.attachHandlers(handlerContainer, handlers);

        handlerContainer.onMessageReceived(firstNum, secondNum);
        expect(state).toEqual(firstNum + secondNum);
        handlerContainer.onMessageUpdated(firstNum, secondNum);
        expect(state).toEqual(firstNum - secondNum);
        handlerContainer.onMessageDeleted(firstNum, secondNum);
        expect(state).toEqual(firstNum * secondNum);
        handlerContainer.onChannelChanged(firstNum);
        expect(state).toEqual(firstNum);
        handlerContainer.onTypingStatusUpdated(firstNum);
        expect(state).toEqual(-firstNum);
        handlerContainer.onReadReceiptUpdated(firstNum);
        expect(state).toEqual(firstNum * firstNum);
        handlerContainer.onUserLeft(firstNum, secondNum);
        expect(state).toEqual(secondNum - firstNum);
        handlerContainer.onUserJoined(firstNum, secondNum);
        expect(state).toEqual(secondNum / firstNum);
    });
});

// describe('createHandlerGlobal', () => {
//     test('calls the appropriate sb sdk calls', () => {
//         let sbWrapper = new SendBirdWrapper(appId);
//         let a = sbWrapper.createHandlerGlobal({});
//         console.log(a);
//     });
// });
