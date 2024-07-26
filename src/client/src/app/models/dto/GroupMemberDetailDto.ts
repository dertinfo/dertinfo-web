﻿import { MemberAttendanceDto } from 'app/models/dto';
    export interface GroupMemberDetailDto {
        groupMemberId: number;
        groupId: number;
        name: string;
        emailAddress: string;
        telephoneNumber: string;
        facebook: string;
        dateOfBirth: Date;
        dateJoined: Date;
        memberType: number;
        memberAttendances: MemberAttendanceDto[];
    }
