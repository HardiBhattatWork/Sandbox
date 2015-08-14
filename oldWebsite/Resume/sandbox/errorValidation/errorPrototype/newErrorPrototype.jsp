<%-- 
    Document   : newErrorPrototype
    Created on : Sep 6, 2013, 10:12:45 AM
    Author     : bmordas
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Prototype Page</title>
    </head>
    <body>
        <div class="fieldParentDivs">
            <div class="fieldHeaderDivs">
                <div class="hLabelDivs">Please insert text:</div>
                <div class="hHelpDivs"></div>
            </div>
            <div class="fieldBodyDivs">
                <input data-validate="required alpha">
                <div class="bHelpDivs"></div>
            </div>
            <div class="fieldErrDivs hidden"></div>
            <div class="fieldHelpDivs"></div>
        </div>   
    </body>
</html>
