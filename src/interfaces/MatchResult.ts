/**
 * Defintes the shape of a MatchResult object used by sorting algorithms and 
 * the GamesView component.
 */
export default interface MatchResult {
  index: number
  matchRating: number
}
// Note: Match result is this shape because it allows us to store a large amount
// of games that can be looked up by index.