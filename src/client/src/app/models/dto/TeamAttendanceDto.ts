﻿import { ActivityTeamAttendanceDto } from 'app/models/dto';

    export interface TeamAttendanceDto {
        id: number;
        teamId: number;
        registrationId: number;
        groupTeamName: string;
        eventName: string;
        eventPictureUrl: string;
        attendanceActivities: ActivityTeamAttendanceDto[];
    }
