


export const SuccessList= {
  showHideSuccess(success) {
    document.getElementById('myApp').style.height='auto';
    document.getElementById('Success-Div').style.height='0px';
    if (success === 'success') {
      document.getElementById('Success-Div').style.height='auto';
      document.getElementById('myApp').style.visibility='0px';
    }
  }

}
