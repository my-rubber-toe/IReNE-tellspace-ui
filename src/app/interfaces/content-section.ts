export class ContentSection {
  section_nbr: number;
  section_title: string;
  section_text: string;

  constructor(position: number) {
    this.section_title = "Untitled";
    this.section_nbr = position;
  }
}
