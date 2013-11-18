jQuery(document).ready(function($)
{
	$("input[data-default], textarea[data-default]").each(function()
	{
		$(this).val($(this).attr("data-default"));
	});
	
	$("input[data-default], textarea[data-default]").focus(function()
	{
		if($(this).val() == $(this).attr("data-default"))
		{
			$(this).val("");
		}
	});
	
	$("input[data-default], textarea[data-default]").blur(function()
	{
		if($(this).val() == "")
		{
			$(this).val($(this).attr("data-default"));
		}
	});
	
});