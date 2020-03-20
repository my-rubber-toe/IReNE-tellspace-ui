import { Author } from "./author";
import { Timeline } from "./timeline";
import { ContentSection } from "./content-section";
import { Actor } from "./actor";

export interface Document {
  id: number;
  title: string;
  description: string;
  published: boolean;
  incidentDate: Date;
  creationDate: Date;
  tagsDoc: string[];
  infrasDocList: string[];
  damageDocList: string[];
  location: string[];
  author: Author[];
  actor: Actor[];
  section: ContentSection[];
  Timeline: Timeline[];
}
