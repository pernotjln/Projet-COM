jQuery(function(){
	
	jQuery('#cfg-contactform-4 .cfg-submit').click(function(){
		
		var formcontainer = jQuery(this).closest('.cfg-contactform');
		var loading = formcontainer.find('.cfg-loading');
		
		loading.show();
		
		var submit_btn =  jQuery(this);
		submit_btn.hide();
		
		formcontainer.find('.cfg-errormessage').hide().remove();
		
		var form_value_array = Array();
		
		formcontainer.find('.cfg-form-value').each(function()
		{
			var elementlabel = jQuery(this).closest('.cfg-element-container').find('.cfg-label-value');
			var elementlabel_id = elementlabel.closest('label').attr('id');
			var elementlabel_value = elementlabel.html();
			
			// catch input text values, textarea values, select values
			if(jQuery(this).is('.cfg-type-text, .cfg-type-textarea, .cfg-type-select'))
			{
				var key = jQuery(this).prop('id');
				var value = jQuery('#'+jQuery(this).prop('id')).val();
				form_value_array.push({'element_id': key, 'element_value': value, 'elementlabel_id':elementlabel_id, 'elementlabel_value':elementlabel_value});
			}
			
		});

		jQuery.post('php/form-validation.php',
				{ 
				'form_value_array':form_value_array,
				},
				function(data)
				{
					loading.hide();
					
					data = jQuery.trim(data);
					
					response = jQuery.parseJSON(data);
						
					if(response['status'] == 'ok')
					{
						
						if(response['redirect_url'])
						{
							window.location.href = response['redirect_url'];
						} else
						{
							validation_message = '<div class="cfg-validationmessage">'+response['message']+'</div>';
								
							formcontainer.find('.cfg-element-container').each(function()
							{
								if(!jQuery(this).find('.cfg-title').html())
								{
									jQuery(this).slideUp('fast');
								}
							});

							formcontainer.find('.cfg-contactform-content').append(validation_message);
						}
							
					} else
					{
						submit_btn.show();
						
						for(var i=0; i<response['message'].length; i++)
						{
							var optioncontainer = jQuery('[name*='+response['message'][i]['element_id']+']:first').closest('.cfg-element-content');

							jQuery('<div class="cfg-errormessage">'+response['message'][i]['errormessage']+'</div>').prependTo(optioncontainer).fadeIn();
						}						
					}
				} /* end function data */
			); /* end jQuery.post */
	}); /* end click submit */
	
});

