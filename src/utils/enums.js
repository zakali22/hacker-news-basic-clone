export const SORT = {
  NONE: (list) => list,
  TITLE: (list) =>
    list.sort((a, b) => a.title.localeCompare(b.title)),
  AUTHOR: (list) =>
    list.sort((a, b) => a.author.localeCompare(b.author)),
  COMMENTS: (list) =>
    list.sort((a, b) => a.num_comments - b.num_comments),
  POINTS: (list) => list.sort((a, b) => a.points - b.points)
};
