const count = (sortedSongs) => (volumn) => {
  const { count } = sortedSongs.reduce(
    ({ count, acc }, v) => {
      if (acc + v < volumn) return { acc: acc + v, count };
      return {
        acc: v,
        count: count + 1,
      };
    },
    {
      count: 0,
      acc: 0,
    }
  );

  return count;
};

function solution(m, songs) {
  const sorted = songs.sort((a, b) => a - b);
  const maxSong = songs.reduce((acc, v) => (acc > v ? acc : v), 0);
  const acc = songs.reduce((acc, v) => acc + v, 0);

  const mid = (maxSong + acc) / 2;
  const countAlbum = count(sorted);

  for (let i = mid; i > maxSong; i--) {
    if (countAlbum(i) === m) return i;
  }

  return 0;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(solution(3, arr));
