window.onload = function(){
    let button = document.querySelector('.MuiButton-sizeLarge');
    if (button) {
        button.click();
    } else {
        console.log('Button not found');
    }
}
