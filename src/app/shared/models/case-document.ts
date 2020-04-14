import { Author } from "./author";
import { Timeline } from "./timeline";
import { ContentSection } from "./content-section";
import { Actor } from "./actor";
import { CaseDocumentCreateRequest } from './case-document-create-request';

export class CaseDocument implements CaseDocumentCreateRequest {
  id?: string;
  title: string;
  description?: string;
  published?: boolean;
  incident_date: Date;
  creationDate?: Date;
  language?: string;
  tagsDoc?: string[];
  infrastructure_type: string[];
  damage_type: string[];
  location?: string[];
  authors: Author[];
  actors: Actor[];
  section?: ContentSection[];
  timeline?: Timeline[];
  tags?: string[];
}
