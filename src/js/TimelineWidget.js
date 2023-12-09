import CreationElements from './CreationElements';

export default class TimelineWidget {
  constructor(container) {
    this.container = container;

    this.timelineBox = this.container.querySelector('.timeline_box');
    this.formAddPost = document.forms.post;
    this.enterText = this.formAddPost.elements.text;
    this.listPosts = this.container.querySelector('.list_posts');
    this.formCoords = document.forms.entercoords;
    this.enterCoords = this.formCoords.elements.coords;
    this.enterCurtain = this.container.querySelector('.enter_curtain');
    this.addBox = this.container.querySelector('.box_add');
    this.btnAddAudio = this.container.querySelector('.add_audio');
    this.btnAddVideo = this.container.querySelector('.add_video');
    this.recBox = this.container.querySelector('.box_rec');
    this.btnEndRec = this.container.querySelector('.btn_end');
    this.btnCansel = this.container.querySelector('.btn_cansel');
  }

  createPost(obj) {
    const post = CreationElements.createElement('li', ['post']);

    const contentBox = CreationElements.createElement('div', ['content_box']);
    let content = null;

    switch (obj.type) {
      case 'text':
        content = CreationElements.createElement('p', ['content_text', 'content']);
        content.textContent = obj.text;
        break;

      case 'audio':
        content = CreationElements
          .createElement('audio', ['content_audio', 'content'], [{ name: 'src', value: obj.src }, { name: 'controls', value: true }]);
        break;

      case 'video':
        content = CreationElements
          .createElement('video', ['content_video', 'content'], [{ name: 'src', value: obj.src }, { name: 'controls', value: true }]);
        break;

      default:
        break;
    }
    contentBox.append(content);
    post.append(contentBox);

    const dateBox = CreationElements.createElement('div', ['date_box']);
    const dateText = CreationElements.createElement('span', ['date_text']);
    dateText.textContent = obj.date;
    dateBox.append(dateText);
    post.append(dateBox);

    const coordsBox = CreationElements.createElement('div', ['coordinates_box']);
    const coordsText = CreationElements.createElement('span', ['coordinates_text']);
    coordsText.textContent = obj.coords;
    coordsBox.append(coordsText);
    post.append(coordsBox);

    this.listPosts.append(post);
    post.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }

  toggleBtnBox() {
    this.enterText.classList.toggle('hidden');
    this.enterCurtain.classList.toggle('hidden');
    this.addBox.classList.toggle('hidden');
    this.recBox.classList.toggle('hidden');
  }
}
