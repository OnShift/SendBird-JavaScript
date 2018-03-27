import SendBird from '../node_modules/sendbird';
import SendBirdWrapper from '../src/js/sendbird';

jest.mock('../node_modules/sendbird');

beforeEach(() => {
    SendBird.mockClear();
});

let appId = 'appId';

function verifyCall(method, numOfCalls) {
    expect(SendBird.mock.instances[0][method].mock.calls.length).toBe(numOfCalls);
}

test('when a wrapper is instantiated a new sendbird instance is as well', () => {
    new SendBirdWrapper(appId);
    expect(SendBird).toHaveBeenCalledTimes(1);
    verifyCall('constructor', 1);
});
