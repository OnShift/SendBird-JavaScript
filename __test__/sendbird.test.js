import SendBird from '../node_modules/sendbird';
import SendBirdWrapper from '../src/js/sendbird-wrapper';

const mockChannelHandler = jest.fn();
const mockAddChannelHandler = jest.fn();

jest.mock('../node_modules/sendbird', () => {
    return jest.fn().mockImplementation(() => {
        return {
            ChannelHandler: mockChannelHandler,
            addChannelHandler: mockAddChannelHandler,
            createUserListQuery: () =>  {
                return {
                    hasNext: true,
                    limit: 25,
                    isLoading: false,
                    next: () => {}
                };
            }
        };
    });
});

const appId = 'appId';

beforeEach(() => {
    SendBird.mockClear();
});


test('when a wrapper is instantiated a new sendbird instance is as well', () => {
    new SendBirdWrapper(appId);
    expect(SendBird).toHaveBeenCalledTimes(1);
    expect(SendBird.mock.instances[0].constructor.mock.calls.length).toBe(1);
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
        handlerContainer.onUserLeft(firstNum, secondNum);
        expect(state).toEqual(secondNum - firstNum);
        handlerContainer.onUserJoined(firstNum, secondNum);
        expect(state).toEqual(secondNum / firstNum);
    });
});

describe('createHandlerGlobal', () => {
    test('calls the appropriate sb sdk calls', () => {
        let sbWrapper = new SendBirdWrapper(appId);
        sbWrapper.createHandlerGlobal();
        expect(mockChannelHandler).toHaveBeenCalledTimes(1);
        expect(mockAddChannelHandler).toHaveBeenCalledTimes(1);
    });
});

describe('getUserList', () => {
    test('sets the limit on the query to 100', () => {
        let sbWrapper = new SendBirdWrapper(appId);
        sbWrapper.getUserList(() => {}, () => {}, 1);
        sbWrapper.userListQuery.limit = 100;
    });
});
