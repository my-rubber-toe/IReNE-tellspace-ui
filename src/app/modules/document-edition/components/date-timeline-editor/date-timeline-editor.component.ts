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

  minDateStart: Date;
  //maxDateStart: Date; //Seting max date of start to be the current end date
  // minDateEnd: Date; //Setting min date for end to the current start date
  maxDateEnd: Date;

  constructor(
    private fb: FormBuilder,
    private edition: DocumentEditionService
  ) {
    // Set tminimum and maximun dates
    const currentYear = new Date().getFullYear();
    this.minDateStart = new Date(currentYear - 20, 0, 1);
    this.maxDateEnd = new Date();
  }

  private initTimelineEvent(): FormGroup {
    return this.fb.group(
      {
        event: ["", Validators.required],
        eventStartDate: [this.maxDateEnd, Validators.required],
        eventEndDate: [this.maxDateEnd, Validators.required],
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
          event: [timeEvent.event, Validators.required],
          eventStartDate: [timeEvent.eventStartDate, Validators.required],
          eventEndDate: [timeEvent.eventEndDate, Validators.required],
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
    this.edition.editTimeline(this.timelineForm.getRawValue().timeline);
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
