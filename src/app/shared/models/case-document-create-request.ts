import { Actor } from "./actor";
import { Author } from "./author";

export interface CaseDocumentCreateRequest {
  title: string;
  description?: string;
  incident_date: string;
  actors: Actor[];
  authors: Author[];
  damage_type: string[];
  infrastructure_type: string[];
  language: string;
}
