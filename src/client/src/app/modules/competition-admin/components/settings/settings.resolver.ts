// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

// Types
import { CompetitionSettingsDto } from 'app/models/dto';
import { CompetitionRepository } from 'app/modules/repositories';
import { CompetitionAdminTracker } from '../../services/competition-admin.tracker';

@Injectable()
export class SettingsResolver implements Resolve<Observable<CompetitionSettingsDto>> {
    constructor(
        private _competitionRepo: CompetitionRepository,
        private _tracker: CompetitionAdminTracker,

    ) { }

    resolve(activatedRoute: ActivatedRouteSnapshot) {

        const id = parseInt(activatedRoute.parent.paramMap.get('id'), 10);

        if (this._tracker.hasLoadedSettings() && this._tracker.competitionId === id) {
            return of(this._tracker.settings);
        } else {
            return this._competitionRepo.settings(id);
        }
    }
}
