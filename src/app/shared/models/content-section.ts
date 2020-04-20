export class ContentSection {
  section_title: string;
  section_text: string;

  constructor(title: string, text?: string) {
    this.section_title = title;

    this.section_text = text;
  }
}
