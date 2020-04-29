import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { SectionEditorComponent } from "@app/modules/document-edition/pages/section-editor/section-editor.component";

@Injectable()
export class CanDeactivateSectionEditorGuard
  implements CanDeactivate<SectionEditorComponent> {
  canDeactivate(target: SectionEditorComponent) {
    if (!target.isSaved) {
      return window.confirm(
        "Section has not finished saving, do you want to discard changes?"
      );
    }
    return true;
  }
}
