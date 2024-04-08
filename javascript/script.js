// things to do:
// [ NONE FOR NOW ]
// end of things to do


// create global variables

let is_uploader_div_hidden = false;
let submit_button;
let toggle_button;
let uploader_div;
let image_and_captions_div;
let preview_div;
let user_caption_input;
let image_path;
let user_image_path;
let new_image;
let image_list = [];
let caption_list = []
let export_button;


// end of global variables

function show_image(event){
    console.log("entered function")
    console.log(event)
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
    
        reader.onload = function (e) {
        //   $('#blah').attr('src', e.target.result).width(150).height(200);
            console.log(e.target.result)
            new_image = document.createElement("img");
            new_image.setAttribute('src', e.target.result);


        };
    
        reader.readAsDataURL(event.target.files[0]);
      }
}


function run_program(){

    initialize_html_elements()

    // adds event listeners to relevant buttons
    toggle_button.addEventListener("click", toggle_uploader_div)
    submit_button.addEventListener("click", submit_function)
    // image_button.addEventListener("click", upload_images)
    export_button.addEventListener("click", export_gallery)

    document.querySelector("#image_uploader").addEventListener("change", (event) => show_image(event))


}

// connects javascript variables to  HTML elements
function initialize_html_elements(){

    toggle_button = document.querySelector("#toggle_button");
    submit_button =  document.querySelector("#submit_button");
    uploader_div = document.querySelector("#uploader_div");
    image_and_captions_div = document.querySelector("#image_and_captions");
    preview_div = document.querySelector("#preview_div");
    export_button = document.querySelector("#export_button");

}

// lets user hide/unhide entire uploader div
function toggle_uploader_div(){
    console.log("clicked")
    // hides the div
    if (is_uploader_div_hidden === false){
        image_and_captions_div.style.display = "none";
        console.log(image_and_captions_div.style.display)
        toggle_button.textContent = "v";
        is_uploader_div_hidden = true;
        preview_div.style.height = "658px";
        console.log("uploader_div is hidden")
    }
    
    // unhides the div
    else if (is_uploader_div_hidden === true){
        image_and_captions_div.style.display = "block";
        toggle_button.textContent = "^";
        is_uploader_div_hidden = false;
        preview_div.style.height = "525px";
        console.log("uploader_div is unhidden")

    }
}

function submit_function(){
    user_caption_input = document.querySelector("#type_caption").value;
    console.log(user_caption_input);


    update_preview_div(user_caption_input, new_image)

    document.querySelector("#image_uploader").value = '';
    document.querySelector("#type_caption").value = '';
    new_image = null;

}

// adds images + captions to preview div, images is already a element but caption must be made into a element
function update_preview_div(caption_value, image ){
    if (!image || !(image instanceof HTMLElement)) {
        alert('Pwease provide a image >_>');
        return;
    }

    // Checking if the image has a valid format based on info in its DATA URL (by comparing it to a list of valid formats - pictures + gifs)
    const valid_types = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

    const image_url = image.src;
    // tries to extract the data url part only -> SOURCE = GOOGLE for this line 
    const type_match = image_url.match(/^data:(.*?);base64,/);

    let is_valid_format = false; 

    // if image has data URL, see if it includes valid_types 
    if (type_match) {
        is_valid_format = valid_types.includes(type_match[1]);
    }

    if (!is_valid_format) {
        alert('Pwease provide the correct format! >_>');
        return;
    }


    const frame_div = document.createElement("div");
    const caption_element = document.createElement("p");

    caption_element.textContent = caption_value;

    frame_div.appendChild(caption_element); 

    // Set the frame_div's style, which the user can change later
    frame_div.style.padding = "10px"; 
    frame_div.style.height = "300px";

     // Set the image's style, which user can  change later     
     image.style["maxHeight"] = "100%";
     image.style["width"] = "auto"; 
     // image_list.append(new_image)
     frame_div.appendChild(image);

     // Set the caption's style, which the user can change later
     caption_element.style["color"] = "blue";
     // caption_list.append(caption_element);
     frame_div.appendChild(caption_element);
    

    preview_div.appendChild(frame_div)
}

// loop through image list and caption list to change styles ( NOT IMPLEMENTED YET)
function update_styles(){

}

// exports html for a functioning img. gallery website
function export_gallery() {
    const preview_HTML = preview_div.innerHTML;
    const export_HTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Custom Image Gallery</title>
    </head>
    <body>
    ${preview_HTML}
    </body>
    </html>
        `
    // CREDIT FOR THIS -> GOOGLE - but comments are mine to help me understand
    const enconded_html = encodeURIComponent(export_HTML);

    // Create the data URL
    const data_url = 'data:text/html;charset=utf-8,' + enconded_html;
    
    // Creates temporary link 
        const link = document.createElement('a');
        link.href = data_url;
        link.download = 'custom_image_gallery.html';
    
    // Triggers the download
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link); 
}


// Run the program when the document is loaded
document.addEventListener("DOMContentLoaded", run_program);
