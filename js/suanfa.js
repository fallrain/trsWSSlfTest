/*
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
*/
function f1 (ay) {
  let rlt = 0;
  ay.forEach(v => {
    rlt ^= v;
  });
  return rlt;
}
console.log(f1([1, 2, 3, 3, 1, 4, 5, 4, 2]));
