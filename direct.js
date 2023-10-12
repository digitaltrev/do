window.onload = function(){
    console.log("lets go")
    let button = document.querySelector('.MuiButton-sizeLarge');
    console.log(button)
    if (button) {
        button.click();
    } else {
        console.log('Button not found');
    }
}
