<%@include file="/WEB-INF/view/viewsupport.jsp" %>
<%-- 
    Document   : inputFieldTemplate

    This is a standard template for all input fields to use to maintain consistency across all applications.  Error 
    handling depends on this universal setup to function
--%>

<div class="fieldParentDivs">
    <div class="fieldHeaderDivs">
        <div class="hLabelDivs"></div>
        <div class="hHelpDivs"></div>
    </div>
    <div class="fieldBodyDivs">
        <input>
        <div class="bHelpDivs"></div>
    </div>
    <div class="fieldErrDivs hidden"></div>
    <div class="fieldHelpDivs"></div>
</div>    