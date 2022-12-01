export default function getRandomColor(tableNumber) {
    var h = Math.floor(tableNumber * (360/5.5));
    var s = 100;
    var l = 38;

    var color = "hsl(" + h + "," + s + "%," + l + "%)";
    return color
  }