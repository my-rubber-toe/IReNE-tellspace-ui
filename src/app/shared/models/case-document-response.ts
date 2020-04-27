import { Author } from "./author";
import { TimelineResponse } from "./timeline-response";
import { ContentSection } from "./content-section";
import { Actor } from "./actor";

export class CaseDocumentResponse {
  id?: string;
  creatoriD?: string;
  title: string;
  description: string;
  published: boolean;
  incidentDate: string;
  creationDate: string;
  lastModificationDate: string;
  language: string;
  tagsDoc: string[];
  infrasDocList: string[];
  damageDocList: string[];
  location: string[];
  author: Author[];
  actor: Actor[];
  section: ContentSection[];
  timeline: TimelineResponse[];
}
