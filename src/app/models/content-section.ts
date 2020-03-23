export class ContentSection {
  section_nbr: number;
  section_title: string;
  section_text: string;

  constructor(position: number, title: string) {
    this.section_title = title;
    this.section_nbr = position;
  }
}
