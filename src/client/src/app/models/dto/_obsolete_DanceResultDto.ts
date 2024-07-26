﻿import { DanceMarkingSheetDto, DanceScoreDto } from 'app/models/dto';

    export interface _obsolete_DanceResultDto {
        danceId: number;
        competitionId: number;
        competitionName: string;
        teamId: number;
        teamName: string;
        teamPictureUrl: string;
        venueId: number;
        venueName: string;
        hasScoresEntered: boolean;
        hasScoresChecked: boolean;
        scoresEnteredBy: string;
        overrun: boolean;
        danceMarkingSheets: DanceMarkingSheetDto[];
        danceScores: DanceScoreDto[];
    }
