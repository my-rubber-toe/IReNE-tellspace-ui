import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { Timeline } from "@app/shared/models/timeline";

@Component({
  selector: "app-date-timeline-editor",
  templateUrl: "./date-timeline-editor.component.html",
  styleUrls: ["./date-timeline-editor.component.scss"],
})
export class DateTimelineEditorComponent implements OnInit {
  @Input() timeline: Timeline[];

  @Input() incident_date: Date;

  timelineForm: FormGroup;

  incidentDateControl: FormControl;

  editingTimeline: boolean = false;

  editingIncidentDate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private edition: DocumentEditionService
  ) {}

  private initTimelineEvent(): FormGroup {
    return this.fb.group(
      {
        event_description: ["", Validators.required],
        event_date: ["", Validators.required],
      },
      Validators.required
    );
  }

  ngOnInit(): void {
    this.incidentDateControl = this.fb.control("", Validators.required);

    this.incidentDateControl.setValue(this.incident_date);

    this.timelineForm = this.fb.group({
      timeline: this.fb.array([]),
    });
    this.timeline.forEach((timeEvent) => {
      this.addTimelineEventX(timeEvent);
    });
  }

  addTimelineEventX(timeEvent: Timeline) {
    const control = this.timelineForm.get("timeline") as FormArray;
    control.push(
      this.fb.group(
        {
          event_description: [timeEvent.event_description, Validators.required],
          event_date: [timeEvent.event_date, Validators.required],
        },
        Validators.required
      )
    );
  }

  addTimelineEvent() {
    const control = this.timelineForm.get("timeline") as FormArray;
    control.push(this.initTimelineEvent());
  }

  removeTimelineEvent(i: number) {
    let timelineArray = this.timelineForm.controls.timeline as FormArray;
    timelineArray.removeAt(i);
  }

  toggleEditingTimeline() {
    console.log(this.timelineForm.status);
    this.editingTimeline = !this.editingTimeline;
  }

  saveTimeline() {
    console.log("Saved timeline: ", this.timelineForm.getRawValue());
    this.edition.editTimeline(this.timelineForm.getRawValue());
    this.toggleEditingTimeline();
  }

  toggleEditingIncidentDate() {
    this.editingIncidentDate = !this.editingIncidentDate;
  }

  saveIncidentDate() {
    console.log("Saved incident date: ", this.incidentDateControl.value);
    this.edition.editIncidentDate(this.incidentDateControl.value as Date);
    this.toggleEditingIncidentDate();
  }
}
