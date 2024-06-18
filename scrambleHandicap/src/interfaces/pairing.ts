import { Team } from "./team";

export interface Pairing {
    teams: Team[],
    handicapDiff?: number
}
