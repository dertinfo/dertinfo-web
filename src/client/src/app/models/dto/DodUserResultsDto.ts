﻿import { DodGroupResultsScoreCardDto } from './DodGroupResultsScoreCardDto';

export interface DodUserResultsDto {
    dodUserId: number;
    name: string;
    email: string;
    scoreCards: DodGroupResultsScoreCardDto[];
}
