/**
 * 
 */
function validateForm() 
{
    var x = document.forms["myForm"]["username"].value;
    if (x.length < 4 || x.length>50) {
    	console.log("js file in");
      alert("Name must be of the length between 4 - 50");
      document.forms["myForm"]["username"].focus(); 
      return false;
    }

}