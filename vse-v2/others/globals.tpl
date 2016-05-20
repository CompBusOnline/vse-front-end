{% assign photo_dir = '/vehicles/photos/' -%}
{% assign details_url = '/vehicle/' -%}

{% if globals.visitor.deviceClass == "tablet" -%}
	{% assign thumbnail = "?Action=thumbnail&Width=650" -%}
{% elsif globals.visitor.deviceClass == "phone" -%}
	{% assign thumbnail = "?Action=thumbnail&Width=320" -%}
{% elsif globals.visitor.deviceClass == "desktop" -%}
	{% assign thumbnail = "?Action=thumbnail&Width=435&Height=294&algorithm=fill_proportional" -%}
{% else -%}
	{% assign thumbnail = "" -%}
{% endif -%}