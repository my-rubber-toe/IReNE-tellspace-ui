export class ContentSection {
  content: string;
  secTitle: string;

  constructor(title: string, text?: string) {
    this.secTitle = title;

    this.content= text;
  }
}
