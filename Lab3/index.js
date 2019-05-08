class CoverGenerator {
  constructor() {
    this.height = 600;
    this.width = 600;
    this.fontSize = 30;
    this.lineHeight = 1.5 * this.fontSize;

    this.canvas = this.createElement('canvas', undefined, {width: this.width, height: this.height});
    this.context = this.canvas.getContext('2d');
    this.context.font = `${this.fontSize}px "Times New Roman"`;
    this.context.textBaseline = 'bottom';
    this.context.fillStyle = '#fff';

    document.body.appendChild(this.canvas);

    this.createButtons();

    this.generate();
  }

  async generate() {
    this.context.clearRect(0, 0, this.width, this.height);

    await this.addImages();
    this.addOverlay();
    await this.addQuote();
  }

  async addImages() {
    const images = await Promise.all(this.fetchImages());

    images.forEach((img, i) => {
      this.context.drawImage(img, i % 2 * this.width / 2, Math.floor(i / 2) * this.height / 2);
    });
  }

  addOverlay() {
    const oldStyle = this.context.fillStyle;

    this.context.fillStyle = 'rgba(0, 0, 0, 0.65)';
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = oldStyle;
  }

  async addQuote() {
    const quote = await this.fetchQuote();

    const words = quote.split(' ');
    const padding = 0.2 * this.width;

    let currentLine = '';

    const lines = words.reduce((result, word, i) => {

      const {width} = this.context.measureText(`${currentLine} ${word}`);

      if (width >= this.width - 2 * padding || i === words.length - 1) {
        result.push(currentLine.trim());

        currentLine = word;
      } else {
        currentLine += ` ${word}`;
      }

      return result;
    }, []);

    lines.forEach((line, i) => {

      const {width} = this.context.measureText(line);

      const x = (this.width - width) / 2;
      const y = (this.height - lines.length * this.lineHeight) / 2 + (i + 1) * this.lineHeight;

      this.context.fillText(line, x, y);
    });
  }

  fetchImages() {
    const endpoint = `https://source.unsplash.com/collection/1111680/${this.width / 2}x${this.height / 2}`;
    const promises = [];

    for (let i = 0; i < 4; i++) {
      const image = new Image();

      image.crossOrigin = 'anonymous';

      promises.push(new Promise(resolve => {
        image.addEventListener('load', () => {
          resolve(image);
        })
      }))

      image.src = `${endpoint}?${Math.random()}`;
    }

    return promises;
  }

  async fetchQuote() {
    const endpoint = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru&jsonp=receiveQuote';

    return new Promise(resolve => {
      let quoteText;

      window.receiveQuote = (quote) => {
        quoteText = quote.quoteText;
      }
      const script = this.createElement('script', undefined, {src: endpoint});

      script.addEventListener('load', () => {
        window.receiveQuote = null;
        script.remove();

        resolve(quoteText);
      });

      document.head.appendChild(script);
    });
  }

  createButtons() {
    const generate = this.createElement('button', undefined, {innerHTML: 'Generate', type: 'button'});

    generate.addEventListener('click', () => {
      this.generate();
    });

    const downloadLink = this.createElement('a', undefined, {download: 'quote'});
    const downloadBtn = this.createElement('button', undefined, {innerHTML: 'Download', type: 'button'});

    downloadLink.appendChild(downloadBtn);

    downloadBtn.addEventListener('click', () => {
      const image = this.canvas.toDataURL('image/jpg');

      downloadLink.setAttribute('href', image);
    });

    document.body.append(generate, downloadLink);
  }

  createElement(name, classList, attributes) {
    const element = document.createElement(name);

    if (classList) {
      if (typeof classList === 'string') {
        element.classList.add(classList);
      } else {
        element.classList.add(...classList);
      }
    }

    if (attributes) {
      Object
        .entries(attributes)
        .forEach(([name, value]) => {
          element[name] = value;
        })
    }

    return element;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new CoverGenerator();
});
