<?php

session_start();

require_once('contactform.config.php');

require_once('class.contactform.php');

$contactform_obj = new contactForm($cfg);

$json_error = '';



$post_required_email = array('cfg-element-4-34');

?>
<?php

if(isset($_POST['form_value_array']) && $_POST['form_value_array'])
{
	foreach($_POST['form_value_array'] as $value)
	{
		$contactform_obj->mergePost($value);

	}
}

if(isset($post_required_element) && $post_required_element && isset($contactform_obj->merge_post) && $contactform_obj->merge_post)
{
	
	foreach($post_required_element as $value)
	{
		foreach($contactform_obj->merge_post as $vvalue)
		{
			if($vvalue['element_id'] == $value)
			{
				if(!$vvalue['element_value'])
				{	
					$json_error .= '{"element_id":"'.$value.'",  "errormessage": "'.addcslashes($contactform_obj->cfg['form_errormessage_emptyfield'], '"').'", "elementlabel_id": "'.$vvalue['elementlabel_id'].'"},';
				}
				break;
			}
		}
		
	}
}

if(isset($post_required_email) && $post_required_email)
{
	
	foreach($post_required_email as $value)
	{
		foreach($contactform_obj->merge_post as $vvalue)
		{
			if($vvalue['element_id'] == $value)
			{
				$param['reply_emailaddress'] = $vvalue['element_value'];

				if(!$contactform_obj->isEmail($vvalue['element_value']))
				{
					$json_error .= '{"element_id":"'.$value.'", "errormessage": "'.addcslashes($contactform_obj->cfg['form_errormessage_invalidemailaddress'], '"').'", "elementlabel_id": "'.$vvalue['elementlabel_id'].'"},';
	
				}
				break;
			}
		}
		
	}
}

// FORMATTING JSON RESPONSE AND SENDING MAIL
if($json_error)
{
	$json_response = '{'
							.'"status":"nok",'
							.'"message":['.substr($json_error,0,-1).']'
							.'}';
} else{
	
	if(isset($contactform_obj->merge_post) && $contactform_obj->merge_post)
	{
		
		$param['reply_emailaddress'] = (isset($param['reply_emailaddress']) && $param['reply_emailaddress'])?$param['reply_emailaddress']:'';
		
		$contactform_obj->sendMail($param);
		
		if($contactform_obj->cfg['usernotification_inputid'])
		{
			foreach($contactform_obj->merge_post as $vvalue)
			{
				if($vvalue['element_id'] == $contactform_obj->cfg['usernotification_inputid'])
				{
					$receipt_cfg['email_address'] = $vvalue['element_value'];
					break;
				}
			}
	
			$contactform_obj->sendMailReceipt($receipt_cfg);
			
		}
		
		$redirect_url = $contactform_obj->cfg['form_redirecturl'] ? $contactform_obj->cfg['form_redirecturl'] : '';

		
		$json_response = '{'
								.'"status":"ok",'
								.'"message":"'.addcslashes($contactform_obj->cfg['form_validationmessage'], '"').'",'
								.'"redirect_url":"'.addcslashes($redirect_url, '"').'"'
								.'}';
	}
	// no input field values ($contactform_obj->merge_post is empty)
	else
	{
		$json_response = '{'
								.'"status":"nok",'
								.'"message":""'
								.'}';
	}
}

echo $json_response;

?>
