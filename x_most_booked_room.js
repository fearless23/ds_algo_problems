/*
Given a hotel which has 10 floors [0-9] and each floor has 26 rooms [A-Z]. 
You are given a sequence of rooms, where + suggests room is booked, - room is freed. 
You have to find which room is booked maximum number of times.

You may assume that the list describe a correct sequence of 
bookings in chronological order; that is, only free rooms can be booked 
and only booked rooms can be freeed. All rooms are initially free. 
Note that this does not mean that all rooms have to be free at the end. 
In case, 2 rooms have been booked the same number of times, return the lexographically smaller room.

You may assume:

N (length of input) is an integer within the range [1, 600]
each element of array A is a string consisting of three characters: "+" or "-"; a digit "0"-"9"; 
and uppercase English letter "A" - "Z"
the sequence is correct. That is every booked room was previously free 
and every freed room was previously booked.

Example:

Input: ["+1A", "+3E", "-1A", "+4F", "+1A", "-3E"]
Output: "1A"
Explanation: 1A as it has been booked 2 times.
*/

const most_booked = (arr) => {
  let max_count = 0;
  const bookings = {};

  for (const item of arr) {
    const [sign, floor, room_char] = item.split('');
    const room = `${floor}${room_char}`
    if (sign === '+') {
      if (!bookings[room]) bookings[room] = { room, count: 0 };
      bookings[room].count += 1;
      if (bookings[room].count > max_count) max_count = bookings[room].count
    }
  }

  // go over bookings, find rooms with max count
  const max_bookings = Object.values(bookings)
  .filter(i => i.count === max_count).sort((a,b) => a.room.localeCompare(b.room));
  console.log(max_bookings)
  return max_bookings[0].room;
}


const nums = ["+1A", "+3E", "-1A", "+4F", "+1A", "-3E"]
const result = most_booked(nums);
console.log(`result --> `, result)


