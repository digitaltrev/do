window.onload = function(){
    print("lets go")
    let button = document.querySelector('.MuiButton-sizeLarge');
    print(button)
    if (button) {
        button.click();
    } else {
        console.log('Button not found');
    }
}
