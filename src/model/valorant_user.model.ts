import RiotUserModel from "./riot_user.model"

interface TierModel {
    id: number | undefined,
    name: string,
}

interface ValorantUserModel extends RiotUserModel {
    current: {
        tier: TierModel | undefined,
        rr: number | undefined,
        last_change: number | undefined,
        games_needed_for_rating: number | undefined,
        leaderboard_placement: Object | undefined
    }
}

export default ValorantUserModel