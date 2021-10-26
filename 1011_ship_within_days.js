/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
const shipWithinDays = function (weights, days) {
  /*
  min capacity => The highest weight in weights can be send alone, thus min = Math.max(...weights)
  max capacity => The sum of all weights; i.e send all weights in a day.
  So, actual answer lies b/w min and max

  # Solution 1: 
  Start from min, if we can send packages with min then that is the answer else try with min+1
  TC: loop over weigths every time from min to max; => O(n*(max-min))

  # Solution 2:
  Start from mid of max and min; calculate days for capacity = mid;
  if(days > actual days) solution lies in start to mid - 1;
  if(days = actual) solution could be less than or equal to mid;
  if(days < actual days) solution lies in mid to start
  
  This way we are rejecting our solutions by half every time, until min === max;
  */


  let max = weights.reduce((acc, cur) => acc + cur, 0); // if all weights
  let min = Math.max(...weights)

  while(min < max){
    // 4, 7 => 5
    const mid = Math.floor((min + max) / 2);
    const days_for_mid = get_days(mid, weights);
    if(days_for_mid > days) {
      // increase capacity, as this capacity takes more days than required
      min = mid + 1;
      max = max;
    }
    else{
      // decrease capacity, as this capacity takes less days than required 
      // check lesser capacity, as this capacity takes same days than required 
      min = min;
      max = mid;
    }
  }

  return min;
};

const get_days = (capacity, weights) => {
  // find days it will take for this capacity

  let day_weight = 0;
  let days = 1;
  for(const w of weights){
    day_weight += w;
    if(day_weight > capacity){
      day_weight = w;
      days += 1;
    }
  }
  return days;
}



// const weights = [180, 373, 75, 82, 497, 23, 303, 299, 53, 426, 152, 314, 206, 433, 283, 370, 179, 254, 265, 431, 453, 17, 189, 224] // 631
// const days = 12
const weights = [1,2,3,4,5,6,7,8,9,10] // 15
const days = 5
const result = shipWithinDays2(weights, days);
console.log(`result --> `, result)