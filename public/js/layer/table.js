

	//页面普通输入框表格js

	$(function() {	
		
			
         /*点击该输入框时触发*/
         $(".myInput").focus(function(){
			 $(this).parents(".field-group").find(".alertText").show();
			 $(this).removeClass("myInputBlur").addClass("myInputFocus");
			 $(this).parents(".field-group").find(".alertText").removeClass("alertTextFocus"); 
         }); 
         /*点击该输入框之外的地方时触发*/
         $(".myInput").blur(function(){     
			 if($(this).hasClass("inpRequired") && $(this).val().length == 0){ 
				$(this).addClass("myInputBlur");  
			 	$(this).parents(".field-group").find(".alertText").addClass("alertTextFocus");    
			 }
			 else{   
				 $(this).removeClass("myInputBlur").removeClass("myInputFocus");       
				 $(this).parents(".field-group").find(".alertText").hide();	  			 
			 }
			 
         });
		 
		 
     });