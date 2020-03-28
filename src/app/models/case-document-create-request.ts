import { Actor } from "./actor";
import { Author } from "./author";

export interface CaseDocumentCreateRequest {
  title: string;
  incident_date: Date;
  actors: Actor[];
  authors: Author[];
  damage_type: string[];
  infrastructure_type: string[];
}
