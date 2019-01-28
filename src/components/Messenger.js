import React, { Component } from 'react';

export default class Messenger extends Component {
  constructor() {
    super();

    this.state = {
      // chats: [
      //   { id: '1', title: 'Chat 1' },
      //   { id: '2', title: 'Chat 2' },
      //   { id: '3', title: 'Chat 3' },
      //   { id: '4', title: 'Chat 4' },
      //   { id: '5', title: 'Chat 5' },
      // ],
      // messages: {
      //   '1': [
      //     { id: '11', user: 'example@mail.com', time: Date.now(), body: 'Hey!' },
      //     { id: '12', user: 'example@mail.com', time: Date.now(), body: 'Are you here!' },
      //     { id: '13', user: 'a@a.ru', time: Date.now(), body: 'Hello! I am here now' },
      //     { id: '14', user: 'example@mail.com', time: Date.now(), body: 'How are you doing?' },
      //     { id: '15', user: 'a@a.ru', time: Date.now(), body: 'I am fine, thanks!' },
      //   ],
      //   '2': [
      //     { id: '21', user: 'example@mail.ru', time: Date.now() + 1, body: 'Hey from example!' }
      //   ],
      // },
      activeChatId: '0',
      chatName: ''
    };
  }

  changeActiveChatId = (chatId) => {
    this.setState({
      activeChatId: chatId,
      chatName: '',
      modalType: ''
    });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitCreateChat = () => {
    this.props.createChat({
      chatName: this.state.chatName
    });

    this.setState({ chatName: '', modalType: '' });
  }

  closeModal = () => { this.setState({ modalType: '' }); }
  openModal = (modalType) => { this.setState({ modalType: modalType }); }

  getCurrentModal = () => {
    switch(this.state.modalType) {
      case 'createChat':
        return (
          <div className="overlay uk-padding-remove">
            <div>
              <h2 className="uk-h4">Create Chat</h2>
              <div className="uk-margin-small">
                <div className="uk-inline">
                  <span className="uk-form-icon" uk-icon="icon: tag"></span>
                  <input className="uk-input" name="chatName" value={this.state.chatName} onChange={this.onInputChange} type="text" placeholder="chat name" />
                </div>
              </div>
              <button className="uk-button uk-button-primary" onClick={this.submitCreateChat}>Submit</button>
              <button className="uk-button uk-button-secondary" onClick={this.closeModal}>Close</button>
            </div>
          </div>
        );
      case 'notAuthorized':
        return (
          <div className="overlay uk-padding-remove">
            <div>
              <h2 className="uk-h4">Please, log in first</h2>
            </div>
          </div>
        );
      default:
        return '';
    }
  }

  render() {
    if (this.props.chats.length > 0 && !this.props.messages[this.state.activeChatId]) {
      this.setState({ activeChatId: this.props.chats[0].id });
    }

    if (this.state.modalType != 'notAuthorized' && this.props.userEmail == '') {
      this.setState({ modalType: 'notAuthorized' });
    } else if (this.state.modalType == 'notAuthorized' && this.props.userEmail != '') {
      this.setState({ modalType: '' });
    }

    console.log(this.state.modalType, this.props.userEmail == '')

    return (
      <div className="messenger_chat uk-grid">
        <MessengerChatList
          chats={this.props.chats}
          activeChatId={this.state.activeChatId}
          changeActiveChatId={this.changeActiveChatId}
          openModal={this.openModal}
          />
        <MessengerChatView
          messages={this.props.messages[this.state.activeChatId] || []}
          activeChatId={this.state.activeChatId}
          sendMessage={this.props.sendMessage}
          userEmail={this.props.userEmail}
          />
        { this.state.modalType != '' && this.getCurrentModal() }
      </div>
    );
  }
}

class MessengerChatView extends Component {
  render() {
    return (
      <div className='messenger_chat-view uk-width-2-3 uk-padding-remove uk-background-secondary'>
        <MessengerChatViewMessageList
          messages={this.props.messages}
          changeActiveChatId={this.props.changeActiveChatId}
          userEmail={this.props.userEmail}
          />
        <MessengerChatViewForm
          activeChatId={this.props.activeChatId}
          sendMessage={this.props.sendMessage}
          />
      </div>
    );
  }
}

class MessengerChatViewForm extends Component {
  state = {
    message: ''
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendMessage = () => {
    this.props.sendMessage({
      data: this.state.message,
      id: this.props.activeChatId
    });
  }

  render() {
    return (
      <div
        className='messenger_chat-view-form uk-position-bottom'
        >
        <div className="uk-inline uk-width-4-5">
          <span className="uk-form-icon" uk-icon="icon: comment"></span>
          <input className="uk-input" name="message" value={this.state.message} onChange={this.onInputChange} type="text" placeholder="Message" />
        </div>
        <button
          className="uk-button uk-button-primary uk-width-1-5"
          onClick={this.sendMessage}
          >
          Send
        </button>
      </div>
    );
  }
}

class MessengerChatViewMessageList extends Component {
  render() {
    let messageList = this.props.messages.map((message, index) => {
      let isOwn = message.user == this.props.userEmail;

      return (
        <MessengerChatViewMessageListItem
          key={index}
          message={message}
          isOwn={isOwn}
          />
      );
    });

    return (
      <div className='messenger_chat-view-message-list' style={{ height: 'calc(100% - 50px)', overflow: 'scroll' }}>
        { messageList }
      </div>
    );
  }
}

class MessengerChatViewMessageListItem extends Component {

  isToday = (d1) => {
    let d2 = new Date();
    return d1.getFullYear() == d2.getFullYear()
        && d1.getMonth() == d2.getMonth()
        && d1.getDate() == d2.getDate();
  }

  render() {
    // console.log(new Date(this.props.message.time), new Date(), this.isToday(new Date(this.props.message.time)));
    return (
      <div
        className={`messenger_chat-view-message-list-item ${this.props.isOwn ? 'own' : ''}`}
        >
        <div className={`body`}>
          { this.props.message.body }
        </div>
        <div className="date">
          {this.props.message.user} - 08:36 PM
        </div>
      </div>
    );
  }
}

class MessengerChatList extends Component {
  render() {
    let chatsList = this.props.chats.map((chat, index) => {
      let isActive = this.props.activeChatId == chat.id;

      return (
        <MessengerChatListItem
          key={index}
          chat={chat}
          isActive={isActive}
          changeActiveChatId={this.props.changeActiveChatId}
          />
      );
    });

    return (
      <div className='messenger_chat-list uk-width-1-3 uk-padding-remove uk-background-muted'>
        <div style={{ height: 'calc(100% - 40px)', overflow: 'scroll' }}>
          { chatsList }
        </div>
        <button className="uk-button uk-position-bottom uk-width-1-1 uk-button-secondary" onClick={() => this.props.openModal('createChat')}>
          Create Chat
        </button>
      </div>
    );
  }
}

class MessengerChatListItem extends Component {
  render() {
    return (
      <div
        className={`messenger_chat-list-item ${this.props.isActive ? 'active' : ''}`}
        onClick={() => this.props.changeActiveChatId(this.props.chat.id)}
        >
        { this.props.chat.title }
      </div>
    );
  }
}
