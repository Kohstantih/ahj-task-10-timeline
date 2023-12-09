export default class PreviewWidget {
  constructor(container, showErrorMessage) {
    this.container = container;
    this.showErrorMessage = showErrorMessage;

    this.previewStatus = false;

    this.previewBox = this.container.querySelector('.preview_box');
    this.preview = this.previewBox.querySelector('.preview');
  }

  showPreview(element, stream) {
    if ('srcObject' in this.preview) {
      try {
        this.previewStatus = true;
        this.previewBox.classList.remove('hidden');
        const { bottom } = element.getBoundingClientRect();
        this.previewBox.style.top = `${bottom - this.previewBox.offsetHeight - 10}px`;
        this.preview.srcObject = stream;
        this.preview.addEventListener('canplay', (e) => {
          e.preventDefault();
          this.preview.play();
        });
      } catch (err) {
        this.showErrorMessage.showMessage(err.message);
      }
    }
  }

  hidePreview() {
    if (this.previewStatus) {
      this.previewBox.classList.add('hidden');
      this.preview.srcOject = null;
      this.previewStatus = false;
    }
  }
}
