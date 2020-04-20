import { Author } from "./author";
import { Timeline } from "./timeline";
import { ContentSection } from "./content-section";
import { Actor } from "./actor";

export class CaseDocument {
  id?: string;
  creatoriD?: string;
  title: string;
  description: string;
  published: boolean;
  incidentDate: Date;
  creationDate: Date;
  lastModificationDate: Date;
  language: string;
  tagsDoc: string[];
  infrasDocList: string[];
  damageDocList: string[];
  location: string[];
  authors: Author[];
  actors: Actor[];
  section: ContentSection[];
  timeline: Timeline[];
  tags: string[];
}
