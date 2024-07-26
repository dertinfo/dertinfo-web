import { TeamCollatedResultDto } from './TeamCollatedResultDto';

export interface CompetitionResultDto {
    competitionId: number;
    competitionName: string;
    resultType: string;
    teamCollatedResults: TeamCollatedResultDto[];
    scoreCategoryIdsIncluded: number[];
}
