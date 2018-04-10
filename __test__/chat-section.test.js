import Element from '../src/js/elements/elements';
import ChatSection from '../src/js/elements/chat-section';

let el = new Element();
let dummyWidget = el.createDiv();
let chatSection = new ChatSection(dummyWidget);

describe('new', () => {
    test('it can be instantiated', () => {
        expect(chatSection).toBeInstanceOf(ChatSection);
    });

    test('uses a div to reference itself', () => {
        expect(chatSection.self).toBeInstanceOf(HTMLDivElement);
    });

    test("sets it's class name to chat-section", () =>{
        expect(chatSection.self.className).toBe('chat-section');
    });

    test('gets appended to the widget we pass in the constructor', () => {
        expect(dummyWidget.childNodes[0].className).toBe('chat-section');
    });
});

describe('createChatSection', () => {
    let channelUrl = 'www.channel_url.com';
    let chatBoard = chatSection.createChatBoard(channelUrl, false);

    test('creates a chat board', () => {
        expect(chatBoard.className).toBe('chat-board');
    });

    test('attaches itself to the larger chat-section element', () => {
        expect(chatSection.self.childNodes[0].className).toBe('chat-board');
    });

    test('the chat board has an id equal to the channelUrl', () => {
        expect(chatBoard.id).toBe(channelUrl);
    });

    describe('div:topTitle', () => {
        let top = chatBoard.topTitle;
        test('it exists', () => {
            expect(top).toBeInstanceOf(HTMLDivElement);
        });

        test('has a class name of title', () => {
            expect(top.className).toBe('title');
        });

        test('sets the title of the chat', () => {
            expect(top.innerHTML).toBe('Group Channel');
        });
    });

    test('does not expose the functionality to leave the channel', () => {
        expect(chatBoard.topBtnLeave).toBeFalsy();
    });

    test('does not expose functionality to retrieve a list of members for the channel', () => {
        expect(chatBoard.topBtnMembers).toBeFalsy();
    });

});
