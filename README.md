# NBA Snap Shot

D3 Visualization of all NBA Players and their 2018-2019 Statistics


## Live

* [Live](https://aghlichl.github.io/NBA-Snap-Shot/)


## Technologies Used

* HTML & CSS
* D3.js
* D3 Tips

## Key features

* SVG based visualization built with JavaScript, D3.js, and D3 Tips

![splash](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/b2/955283/d11a8b021a6fee94b095e4805b0aa5f3-original.png)


## Code Snippets

Originally I planned to have all the player names shown at the start, however I didn't account for the fact that varying screen sizes would be accessing the application. Furthermore, having over 600 full names in a radial tree was extremely difficult to read on a mobile device therefore I decided to implement a queue that would keep track of user node interactions and limit the user to 6 teams open at the same time.

```js
    function click(d) {
      height = window.innerHeight * 2;
      counter.getUnique();

      if (d.children) {
        if (d.name.length < 4 && d.name !== "NBA") {
          counter = removeFromCounter(d, counter);
          d._children = d.children;
          d.children = null;
        }
      } else {
        if (d.name.length < 4 && d.name !== "NBA") {
          counter.push(d);
          d.children = d._children;
          d._children = null;
          if (counter.length > 6) {
            collapse(counter.shift());
          }
        }
      }
      if (d.name.length <= 3) {
        update(d);
      }
      update(d);
    }
```

## Future Direction
* Search functionality for the players, more advanced analytics
