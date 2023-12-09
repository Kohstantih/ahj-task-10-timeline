export default class ShowInform {
  constructor(container, curtain) {
    this.container = container;
    this.curtain = curtain;

    this.informBox = this.container.querySelector('.inform_box');
    this.messageEl = this.informBox.querySelector('.inform_message');
    this.btnOk = this.informBox.querySelector('.inform_ok');

    this.hideMessage = this.hideMessage.bind(this);
  }

  showMessage(message) {
    this.informBox.classList.remove('hidden');
    this.curtain.showCurtain('99');
    this.messageEl.textContent = message;

    this.informBox.style.left = `${this.container.offsetWidth / 2 - this.informBox.offsetWidth / 2}px`;
    this.informBox.style.top = `${this.container.offsetHeight / 2 - this.informBox.offsetHeight / 2}px`;

    this.btnOk.addEventListener('click', this.hideMessage);
  }

  hideMessage() {
    this.messageEl.textContent = '';
    this.informBox.classList.add('hidden');
    this.curtain.hideCurtain();

    this.btnOk.removeEventListener('click', this.hideMessage);
  }
}
