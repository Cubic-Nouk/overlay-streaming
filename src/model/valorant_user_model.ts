import RiotUserModel from "./riot_user_model"

interface ValorantUserModel extends RiotUserModel {
    current: {
        tier: Object | null,
        rr: number | null,
        last_change: number | null,
        games_needed_for_rating: number | null,
        leaderboard_placement: Object | null
    }
}

export default ValorantUserModel