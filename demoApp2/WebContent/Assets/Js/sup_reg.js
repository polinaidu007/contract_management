function validateForm() 
{
    var x = document.forms["myForm"]["supplier_name"].value;
    if (x.length < 4 || x.length>50) {
      alert("Name must be of the length between 4 - 50");
      document.forms["myForm"]["supplier_name"].focus(); 
      return false;
    }

    
    var count = 0
    var splChars = "*|,\":<>[]{}`\';()@&$#%";
    for (var i = 0; i < document.forms["myForm"]["pswd"].value.length; i++) 
    {
        if (splChars.indexOf(document.forms["myForm"]["pswd"].value.charAt(i)) != -1)
        {
            count = count + 1;
            break;
        }
    }
    if(count==0)
    {
        alert ("Include special characters in password"); 
        document.forms["myForm"]["pswd"].focus(); 
        return false;
    }

}