var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
var grid_container = document.querySelector("main");
var grid_size = 16;

function main(grid_size) {
    render_grid(grid_size);
    handle_mouse();
    show_grid();
    clear_canvas();
    reset_canvas();
}
main(grid_size);
function render_grid(grid_size) {
    grid_container.innerHTML = "";
    for (var row_num = 0; row_num < grid_size; row_num++) {
        var grid_row = document.createElement("div");
        for (var column_num = 0; column_num < grid_size; column_num++) {
            var pixel = document.createElement("div");
            grid_row.appendChild(pixel);
            pixel.classList.add("pixel");
            pixel.classList.add("display_border");
        }
        grid_container.appendChild(grid_row);
    }
}
function handle_mouse() {
    var html = document.querySelector("html");
    var pixels = __spreadArray([], document.querySelectorAll(".pixel"), true);
    html.addEventListener("mouseup", function (e) {
        e.preventDefault();
        pixels.forEach(function (pixel) {
            pixel.removeEventListener("mouseover", color_pixel);
        });
    });
    pixels.forEach(function (pixel) {
        pixel.addEventListener("mousedown", function (e) {
            e.preventDefault();
            var sq = pixel;
            sq.style.background = color;
            pixels.forEach(function (pixel) {
                pixel.addEventListener("mouseover", color_pixel);
            });
        });
    });
}
function show_grid() {
    var pixels = __spreadArray([], document.querySelectorAll(".pixel"), true);
    var toggleGridButton = document.querySelector("#toggle_grid_button");
    toggleGridButton.addEventListener("click", function () {
        pixels.forEach(function (pixel) {
            var square = pixel;
            square.classList.toggle("display_border");
        });
    });
}
function clear_canvas() {
    var pixels = __spreadArray([], document.querySelectorAll(".pixel"), true);
    var clear_button = document.querySelector("#clear_canvas_button");
    clear_button.addEventListener("click", clear_canvas);
    pixels.forEach(function (pixel) {
        var square = pixel;
        square.style.backgroundColor = "transparent";
    });
}
function reset_canvas() {
    var pixels = __spreadArray([], document.querySelectorAll(".pixel"), true);
    var reset_button = document.querySelector("#reset_canvas_button");
    reset_button.addEventListener("click", reset_canvas);
    pixels.forEach(function (pixel) {
        var square = pixel;
        square.style.backgroundColor = "transparent";
    });
    grid_container.style.backgroundColor = "transparent";
}
// * FIXED FUNCTIONS
// ! adds color to passed event's target
var color = "black";
function color_pixel(eve) {
    var div = eve.target;
    div.style.backgroundColor = color;
}
// ! erase button change's color to transparent
var prev_color = "black";
var eraser_button = document.querySelector("#eraser_button");
eraser_button === null || eraser_button === void 0
    ? void 0
    : eraser_button.addEventListener("click", function () {
          prev_color = color;
          color = "transparent";
      });
// ! changes color to picked color
var penColorPicker = document.querySelector("#pen_color");
penColorPicker.addEventListener("change", function (event) {
    var target = event.target;
    color = target.value;
});
// ! changes background color when bg color is selected
var bgColorPicker = document.querySelector("#bg_color");
bgColorPicker.addEventListener("change", function (event) {
    var target = event.target;
    grid_container.style.backgroundColor = target.value;
});
// ! changes color after erase
var pen_button = document.querySelector("#pen_button");
pen_button.addEventListener("click", function () {
    return (color = prev_color);
});
// ! calls main function when grid size is changed
var input = document.querySelector("#grid_size");
input.addEventListener("input", function (event) {
    var target = event.target;
    grid_size = parseInt(target.value);
    console.log("here");
    main(grid_size);
});
