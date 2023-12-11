let grid_container = document.querySelector("main");

let grid_size: number = 16;
//main function
function main(grid_size): void {
    render_grid(grid_size);
    handle_mouse();
    show_grid();
    clear_canvas();
    reset_canvas();
}
main(grid_size);

function render_grid(grid_size: number) {
    grid_container!.innerHTML = "";
    for (let row_num = 0; row_num < grid_size; row_num++) {
        let grid_row = document.createElement("div");
        for (let column_num = 0; column_num < grid_size; column_num++) {
            let pixel = document.createElement("div");
            grid_row.appendChild(pixel);
            pixel.classList.add("pixel");
            pixel.classList.add("display_border");
        }
        grid_container!.appendChild(grid_row);
    }
}

function handle_mouse(): void {
    let html = document.querySelector("html");
    let pixels = [...document.querySelectorAll(".pixel")];
    html!.addEventListener("mouseup", (e) => {
        e.preventDefault();
        pixels.forEach((pixel) => {
            pixel.removeEventListener("mouseover", color_pixel);
        });
    });

    pixels.forEach((pixel) => {
        pixel.addEventListener("mousedown", (e) => {
            e.preventDefault();
            let sq = pixel as HTMLElement;
            sq.style.background = color;
            pixels.forEach((pixel) => {
                pixel.addEventListener("mouseover", color_pixel);
            });
        });
    });
}

function show_grid() {
    let pixels = [...document.querySelectorAll(".pixel")];
    let toggleGridButton = document.querySelector("#toggle_grid_button");
    toggleGridButton!.addEventListener("click", function () {
        pixels.forEach(function (pixel: Element) {
            let square = pixel as HTMLElement;
            square.classList.toggle("display_border");
        });
    });
}

function clear_canvas() {
    let pixels = [...document.querySelectorAll(".pixel")];
    let clear_button = document.querySelector("#clear_canvas_button");
    clear_button!.addEventListener("click", clear_canvas);
    pixels.forEach(function (pixel: Element) {
        let square = pixel as HTMLElement;
        square.style.backgroundColor = "transparent";
    });
}

function reset_canvas() {
    let pixels = [...document.querySelectorAll(".pixel")];
    let reset_button = document.querySelector("#reset_canvas_button");
    reset_button!.addEventListener("click", reset_canvas);
    pixels.forEach(function (pixel: Element) {
        let square = pixel as HTMLElement;
        square.style.backgroundColor = "transparent";
    });
    grid_container!.style.backgroundColor = "transparent";
}

// * FIXED FUNCTIONS

// ! adds color to passed event's target
let color = "black";
function color_pixel(eve: Event) {
    let div = eve.target as HTMLElement;
    div.style.backgroundColor = color;
}

// ! erase button change's color to transparent
let prev_color: string = "black";
let eraser_button = document.querySelector("#eraser_button");
eraser_button?.addEventListener("click", () => {
    prev_color = color;
    color = "transparent";
});

// ! changes color to picked color
let penColorPicker = document.querySelector("#pen_color");
penColorPicker!.addEventListener("change", (event) => {
    let target = event!.target as HTMLInputElement;
    color = target!.value;
});

// ! changes background color when bg color is selected
let bgColorPicker = document.querySelector("#bg_color");
bgColorPicker!.addEventListener("change", (event) => {
    let target = event!.target as HTMLInputElement;
    grid_container!.style.backgroundColor = target.value;
});

// ! changes color after erase
let pen_button = document.querySelector("#pen_button");
pen_button!.addEventListener("click", () => (color = prev_color));

// ! calls main function when grid size is changed
const input = document.querySelector("#grid_size");
input!.addEventListener("input", (event) => {
    let target = event!.target as HTMLInputElement;
    grid_size = parseInt(target.value);
    console.log("here");
    main(grid_size);
});
