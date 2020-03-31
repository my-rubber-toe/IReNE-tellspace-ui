export class ContentSection {
  section_nbr: number;
  section_title: string;
  section_text: string;

  constructor(position: number, title: string, text?: string) {
    this.section_title = title;
    this.section_nbr = position;
    this.section_text = text;
  }
}
