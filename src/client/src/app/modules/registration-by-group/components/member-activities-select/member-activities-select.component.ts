import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MemberType } from '../../../../models/app/Enumerations/MemberType';
import { ActivityDto, ActivityMemberAttendanceDto } from '../../../../models/dto';
import { RegistrationByGroupConductor } from '../../services/registration-by-group.conductor';
import { RegistrationByGroupTracker } from '../../services/registration-by-group.tracker';
import { MemberActivitySelectModel } from './models/member-activities-select.model';

@Component({
    selector: 'app-member-activities-select',
    templateUrl: './member-activities-select.component.html',
    styleUrls: ['./member-activities-select.component.css']
})
export class MemberActivitiesSelectComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription[] = [];
  private eventId: number;

  public allActivities: ActivityDto[] = [];
  public selectedActivityIds: number[] = [];
  public editedActivities: ActivityDto[] = [];

  public selections: MemberActivitySelectModel[] = [];

  constructor(

    private composeDialog: MatDialog,
    private _conductor: RegistrationByGroupConductor,
    private _tracker: RegistrationByGroupTracker
  ) {
  }

  ngOnInit() {

    this._subscriptions.push(this._tracker.registrationOverview$.subscribe((registrationOverview) => {
      if (registrationOverview) {
        this._conductor.initIndividualActivities();
      }
    }));

    this._subscriptions.push(this._tracker.activitiesForIndividuals$.subscribe((activities) => {
      if (activities) {
        this.allActivities = activities;
        this.selections = this.prepareSelections();
      }
    }));

    this._subscriptions.push(this._tracker.focussedMemberAttendance$.subscribe((memberAttendance) => {
      if (memberAttendance && memberAttendance.attendanceActivities) {
        this.selectedActivityIds = memberAttendance.attendanceActivities.map(aa => aa.activityId);
        this.selections = this.prepareSelections();
      }
    }));
  }

  ngOnDestroy() {
    this._subscriptions.map((sub) => { sub.unsubscribe(); });
    this._subscriptions = []; // For good measure
  }

  /**
   * Action taken when a selection event occours.
   * Manages state inside this component until save button hit.
   * @param groupMemberSelectModel the group member related to event
   */
  public onSelectActivityClick(memberActivitySelectModel: MemberActivitySelectModel) {

    const activity = this.allActivities.find(a => a.id === memberActivitySelectModel.id);
    const selectedActivity = this.selectedActivityIds.find(saId => saId === memberActivitySelectModel.id);
    const editedActivity = this.editedActivities.find(ea => ea.id === memberActivitySelectModel.id);

    if (editedActivity) {
      this.editedActivities.splice(this.editedActivities.indexOf(editedActivity), 1);
    } else {
      this.editedActivities.push(activity);
    }

    if (selectedActivity) {
      this.selectedActivityIds.splice(this.selectedActivityIds.indexOf(selectedActivity), 1);
    } else {
      this.selectedActivityIds.push(activity.id);
    }

    this.selections = this.prepareSelections();
  }

  /**
   * [Event] button click event to save the changes to the current members selection.
   */
  public onSelectionSave() {
    this.saveSelectionChanges();
  }

  public onCancel() {
    this.composeDialog.closeAll();
  }

  /**
   * Persists the changes for the edited users in the members selection
   */
  private saveSelectionChanges() {
    const subs = this._conductor.toggleFocussedMemberAttendanceActivities(this.editedActivities).subscribe(activityMemberAttendnaceDtos => {
      subs.unsubscribe();
      this.composeDialog.closeAll();
    });
  }

  private prepareSelections() {
    return this.allActivities.map(a => {

      const activitySelectedId: number = this.selectedActivityIds.find(saId => saId === a.id);
      const activityEdited: ActivityDto = this.editedActivities.find(ea => ea.id === a.id);

      return {
        id: a.id,
        name: a.title,
        selected: !!activitySelectedId,
        changed: !!activityEdited,
        soldOut: a.soldOut
      };
    });
  }
}
